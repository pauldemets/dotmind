import React, { useEffect, useState } from "react";
import './scss/Directory.scss';
import { User } from "../../types/user.type";
import mainService from "../../services/main.service";

const URL_DEFAULT_HEARTH_ICON = "https://gist.githubusercontent.com/bltnico/6f69566be9861c6125dd132b78aef6f1/raw/6a0937aeeaf324649b10e39951b6e331fb700720/heart.svg";
const URL_FILL_HEARTH_ICON = "https://gist.githubusercontent.com/bltnico/6f69566be9861c6125dd132b78aef6f1/raw/6a0937aeeaf324649b10e39951b6e331fb700720/heart-fill.svg";

function Directory() {

    const [users, setUsers] = useState<User[]>([]);
    const [searchUsers, setSearchUsers] = useState<User[]>([]);
    const [favUsers, setFavUsers] = useState<User[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [isShowMore, setIsShowMore] = useState<boolean>(false);

    useEffect(() => {
        mainService.fetchUsers()
            .then((res) => {
                setUsers(res);
                setSearchUsers(res);
            })
            .catch((e: unknown) => console.log(e));
    }, []);


    useEffect(() => {
        searchText.length > 0 ?
            setSearchUsers(
                users.filter(user =>
                    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchText.toLowerCase())
                    ||
                    `${user.email}`.toLowerCase().includes(searchText.toLowerCase())
                ))
            :
            setSearchUsers(users);
    }, [searchText]);

    const handleShowMore = (): void => {
        setIsShowMore(true);
        mainService.fetchAllUsers()
            .then((res) => {
                setUsers(users.concat(res))
                setSearchUsers(searchUsers.concat(res))
            })
            .catch((e: unknown) => console.log(e));
    }

    const handleFavContact = (contact: User): void => {
        if (favUsers.indexOf(contact) === -1) {
            setFavUsers([...favUsers, contact]);
        }
    }

    const handleCancelFavContact = (contact: User): void => {
        if (favUsers.indexOf(contact) !== -1) {
            setFavUsers(favUsers.filter(user => user.id !== contact.id));
        }
    }

    const handleIconHearth = (contact: User): string => {
        if (favUsers.indexOf(contact) === -1) {
            return URL_DEFAULT_HEARTH_ICON;
        }
        else {
            return URL_FILL_HEARTH_ICON;
        }
    }


    const renderContacts = searchUsers.map((user: User, index: number) => {
        return (
            <div className="contact row" key={index}>
                <div className="user-info row">
                    <img src={user.avatar} />
                    <div className="column">
                        <span>{user.first_name} {user.last_name}</span>
                        <span>{user.email}</span>
                    </div>
                </div>
                <img
                    src={handleIconHearth(user)}
                    alt="hearth-icon"
                    onClick={() => handleFavContact(user)}
                    className="fav-icon cliquable"
                />
            </div>
        )
    })

    const renderFavContacts = favUsers.map((user: User, index: number) => {
        return (
            <div className="contact row" key={index}>
                <div className="user-info row">
                    <img src={user.avatar} />
                    <div className="column">
                        <span>{user.first_name} {user.last_name}</span>
                        <span>{user.email}</span>
                    </div>
                </div>
                <img
                    src={URL_FILL_HEARTH_ICON}
                    alt="hearth-icon"
                    className="fav-icon cliquable"
                    onClick={() => handleCancelFavContact(user)}
                />
            </div>
        )
    })

    return (
        <div id="directory" className="column">
            <h2 id="title">My contacts</h2>
            <div id="content" className="row">
                <div id="contacts" className="column">
                    <div id="search-wrapper" className="row">
                        <input
                            type="text"
                            id="input-search"
                            placeholder="search"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <span>Total : {searchUsers.length ?? 0}</span>
                    </div>
                    {renderContacts}
                    {
                        !isShowMore &&
                        <div id="button-more-contacts" onClick={handleShowMore} className="cliquables">
                            <span>Show more</span>
                        </div>
                    }
                </div>
                <div id="fav-contacts" className="column">
                    <h2 id="fav-title">Favorites</h2>
                    {renderFavContacts}
                </div>
            </div>
        </div>
    )

}

export default Directory;