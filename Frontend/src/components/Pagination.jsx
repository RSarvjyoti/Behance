import { Button } from "@chakra-ui/react";

export const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {pageNumbers.map(number => (
                    <li key={number} style={{ margin: '0 10px' }}>
                        <Button onClick={() => paginate(number)}>
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
