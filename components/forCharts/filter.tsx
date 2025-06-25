"use client"

interface Filter {
    value: string,
    filter: Set<string>,
    callback: any
}

export function Filter({value, filter, callback}:Filter) {
    return (
        <button className={filter.has(value) ? "filter-active filter" : "filter"} onClick={() => callback(value)}>
            {value}
        </button>
    )
}