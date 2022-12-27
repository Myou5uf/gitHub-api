import React, { useEffect, useState } from "react";
import {
    useLazyGetUserReposQuery,
    useSearchUsersQuery,
} from "../store/github/githubAPI";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const debounced = useDebounce(search);
    const { data, isLoading, isError } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true,
    });
    const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
        useLazyGetUserReposQuery();

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0);
    }, [debounced, data]);

    const clickHandler = (username: string) => {
        fetchRepos(username);
        setDropdown(false);
    };

    if (isError) {
        return (
            <p className="text-center text-red-600">Something wne wrong...</p>
        );
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search for GitHub username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {dropdown ? (
                    <ul className="dropdown list-none absolute top-[42px] lef-0 right-0 max-h-[200px] overflow-y-scroll w-full shadow-md bg-white">
                        {isLoading && (
                            <p className="text-center text-red-600">
                                Something wne wrong...
                            </p>
                        )}
                        {data?.map((user) => (
                            <li
                                key={user.id}
                                className="py-2 px-4 hover:bg-purple-500 hover:text-white transition-colors cursor-pointer"
                                onClick={() => clickHandler(user.login)}
                            >
                                {user.login}
                            </li>
                        ))}
                    </ul>
                ) : null}
                <div className="container mt-5">
                    {areReposLoading && (
                        <p className="text-center text-red-600">
                            Something wne wrong...
                        </p>
                    )}
                    {repos?.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
