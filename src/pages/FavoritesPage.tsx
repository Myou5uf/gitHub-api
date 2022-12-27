import React from "react";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";

const FavoritesPage = () => {
    const { favorites } = useAppSelector((state) => state.github);
    const { removeFavorite } = useActions();
    if (favorites.length === 0) {
        return <p className="font-bold text-center mt-5">No items.</p>;
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            <ul className="list-none">
                {favorites.map((f, i) => (
                    <li
                        key={f}
                        className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-purple-100 transition-all flex justify-between"
                    >
                        <a href={f} target="_blank">
                            <span className="mr-7">
                                {i + 1}. {f}
                            </span>
                        </a>
                        <button
                            className="py-2 px-4 font-bold text-white uppercase bg-red-400 rounded hover:shadow-md hover:scale-105 transition-all"
                            onClick={() => removeFavorite(f)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesPage;
