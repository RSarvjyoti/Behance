import { Button } from "@chakra-ui/react";

interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({  itemsPerPage, totalItems, paginate }) => {
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