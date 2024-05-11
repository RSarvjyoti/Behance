import React from 'react';
import { Input, Flex } from '@chakra-ui/react';

const SearchBar = ({ setSearchQuery }) => {
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Flex direction="row" alignItems="center" mb={4}>
            <Input
                type="text"
                placeholder="Search..."
                onChange={handleInputChange}
            />
        </Flex>
    );
};

export default SearchBar;
