import { useState } from "react";
import Table from "./Table";

import { BsCaretUpFill,BsCaretDownFill } from "react-icons/bs";

function SortableTable(props) {
    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [buttonFocus, setButtonFocus] = useState(false);
    const { data, config } = props;

    const editButtonFocus = () => {
        setButtonFocus(!buttonFocus);
    };

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
            return '';
        });
    }
    const getIcons = (label) => {
        if (label !== sortBy) {
            return <div style={{ display: 'flex', flexDirection: 'column' }}>
                <BsCaretDownFill style={{ margin: '0px' }} />
                <BsCaretUpFill style={{ margin: '0px' }} />
            </div>;
        }
        if (sortOrder === null) {
            return;
        } else if (sortOrder === 'asc') {
            return <div>
                <BsCaretUpFill />
            </div>;
        }
        else if (sortOrder === 'des') {
            return <div>
                <BsCaretDownFill />
            </div>;
        }

    }

    const updatedConfig = config.map((column, index) => {
        if (!column.sortValue) {
            return column;
        }
        return {
            ...column,
            header: () => <div className="sort">
                <div style={{ display: 'flex', alignItems: "center" }}>
                    {column.label}
                    <button disabled={buttonFocus} onClick={() => handleClickSortOrder(column.label)} className="buttonWithSymbol" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                        {getIcons(column.label)}
                    </button>
                </div>
            </div>
        }
    });

    return <Table {...props} data={updatedData} config={updatedConfig} editButtonFocus={editButtonFocus} />



};

export default SortableTable;