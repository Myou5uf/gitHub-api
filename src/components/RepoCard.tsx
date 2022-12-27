import React, { FC, useState } from "react";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

interface RepoCardProps {
    repo: IRepo;
}

const RepoCard: FC<RepoCardProps> = React.memo(({ repo }) => {
    const { addFavorite, removeFavorite } = useActions();
    const { favorites } = useAppSelector((state) => state.github);
    const [isFav, setIsFav] = useState(favorites.includes(repo.html_url));

    const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addFavorite(repo.html_url);
        setIsFav(true);
    };

    const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        removeFavorite(repo.html_url);
        setIsFav(false);
    };

    return (
        <div className="border py-3 px-5 rounded mb-2 hover:shadow-md transition-all">
            <span>
                <a href={repo.html_url} target="_blank">
                    <h2 className="text-lg font-bold">{repo.full_name}</h2>
                </a>
                <p className="text-sm mt-3">
                    Forks: <span className="font-bold mr-5">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin mt-3">{repo?.description}</p>
            </span>
            <div className="controller mt-3">
                {!isFav ? (
                    <button
                        className="py-2 px-4 font-bold text-white uppercase bg-purple-400 rounded hover:shadow-md hover:scale-105 transition-all mr-3"
                        onClick={addToFavorite}
                    >
                        Add
                    </button>
                ) : (
                    <button
                        className="py-2 px-4 font-bold text-white uppercase bg-red-400 rounded hover:shadow-md hover:scale-105 transition-all"
                        onClick={removeFromFavorite}
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
});

export default RepoCard;
