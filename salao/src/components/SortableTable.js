import { useState } from "react";
import Table from "./Table";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function SortableTable(props) {
    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState('Nome');
    const { data, config } = props;

    const handleClickSortOrder = (label) => {
        if (sortBy && label !== sortBy) {
            setSortOrder('asc');
            setSortBy(label);
            return;
        }
        if (sortOrder === null) {
            setSortOrder('asc');
            setSortBy(label);
        }
        else if (sortOrder === 'asc') {
            setSortOrder('des');
            setSortBy(label);
        }
        else if (sortOrder === 'des') {
            setSortOrder(null);
            setSortBy(null);
        }
    };

    let updatedData = data;
    if (sortOrder && sortBy) {
        const { sortValue } = config.find(column => column.label === sortBy)
        updatedData = [...data].sort((a, b) => {
            const valueA = sortValue(a);
            const valueB = sortValue(b);

            if (typeof valueA === 'string') {
                if (sortOrder === 'des') {
                    return valueA > valueB ? -1 : 1;
                }
                if (sortOrder === 'asc') {
                    return valueA > valueB ? 1 : -1;
                }
            } else {
                if (sortOrder === 'asc') {
                    return valueA - valueB;
                }
                if (sortOrder === 'des') {
                    return valueB - valueA;
                }
            }
        });
    }
    const getIcons = (label) => {
        if (label !== sortBy) {
            return <div style={{display: 'flex', flexDirection: 'column'}}>
                <IoIosArrowDown style={{margin: '0px'}}/>
                <IoIosArrowUp  style={{margin: '0px'}} />
            </div>;
        }
        if (sortOrder === null) {
            return ;
        } else if (sortOrder === 'asc') {
            return <div>
                <IoIosArrowUp />
            </div>;
        }
        else if (sortOrder === 'des') {
            return <div>
                <IoIosArrowDown />
            </div>;
        }

    }

    const updatedConfig = config.map((column, index) => {
        if (!column.sortValue) {
            return column;
        }
        return {
            ...column,
            header: () => <div className="sort" onClick={() => handleClickSortOrder(column.label)}>
                <div style={{ display: 'flex', alignItems: "center"}}>
                    {column.label}
                    {getIcons(column.label)}
                </div>
            </div>
        }
    });

    return <Table {...props} data={updatedData} config={updatedConfig} />



};

export default SortableTable;