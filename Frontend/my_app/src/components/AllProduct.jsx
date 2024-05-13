import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Grid, GridItem, Box, Flex, Button, Card, CardBody, CardFooter,
    Image, Stack, Text, LinkBox, LinkOverlay, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Link,
    Spinner, // Import Spinner component
} from '@chakra-ui/react';
import { Pagination } from './Pagination';
import SearchBar from './SearchBar';

const ITEMS_PER_PAGE = 20;

const AllProduct = () => {
    const [myData, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Track the selected item for adding to cart
    const [cartItems, setCartItems] = useState([]); // State to store items in the cart

    useEffect(() => {
        axios.get('https://behance-z9se.onrender.com/data')
            .then((res) => {
                setData(res.data);
                setLoading(false); // Set loading to false when data is loaded
            })
            .catch(() => setError(error))
    }, []);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const filteredData = myData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    }

    const openPopup = (item) => {
        setSelectedItem(item); // Set the selected item when opening the modal
        setIsOpen(true);

    };

    const closePopup = () => {
        setIsOpen(false);
    };

    const handleAddToCart = () => {
        if (selectedItem) {
            setCartItems(prevItems => [...prevItems, selectedItem]); // Add the selected item to cart
            closePopup(); // Close the modal after adding to cart
        }
    };

    const handleRemoveFromCart = (itemToRemove) => {
        setCartItems(prevItems => prevItems.filter(item => item !== itemToRemove));
    };

    return (
        <Container maxW="container.xl" centerContent>
            {loading ? ( // Show spinner if loading is true
                <Spinner size="xl" style={{ display: 'flex', justifyContent: 'center'}}/>
            ) : (
                <>
                    <Flex direction='row' justifyContent='space-between' p={2} w='100%' alignItems="center" flexWrap="wrap">
                        <Button colorScheme='black' variant='outline' mb={{ base: 2, md: 0 }}>
                            Filter
                        </Button>
                        <Text><span>{currentItems.length}</span> Products</Text>
                        <SearchBar setSearchQuery={setSearchQuery} />
                    </Flex>

                    <Flex direction={['column', 'column', 'row', 'row']} justify="center">
                        <Box w={['100%', '100%', '80%', '80%']} p={4} mb={10}>
                            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={3}>
                                {currentItems.map((post) => {
                                    const { id, img_src, img_src_2, title, price_item, price_item_2 } = post;

                                    const flex = {
                                        display: 'flex', justifyContent: 'center'
                                    };

                                    return (
                                        <GridItem key={id} w='100%' h='auto'>
                                            <Card maxW='300px' h='450px' style={flex}>
                                                <CardBody>
                                                    <LinkBox >
                                                        <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                                            <Box w='200px' h='200px' style={{ overflow: 'hidden' }} >
                                                                <Image
                                                                    src={isHovered ? img_src_2 : img_src}
                                                                    alt={title}
                                                                />
                                                            </Box>
                                                            <Stack mt='6' spacing='3'>
                                                                <Text style={flex}>
                                                                    <LinkOverlay href='#'> {title} </LinkOverlay>
                                                                </Text>
                                                                <Text fontSize='1xl' style={flex}>
                                                                    {isHovered ? price_item_2 : price_item}
                                                                </Text>
                                                            </Stack>
                                                        </Box>
                                                    </LinkBox>
                                                </CardBody>
                                                <CardFooter style={flex}>
                                                    <Button onClick={() => openPopup(post)} style={{ borderRadius: '50px' }}>Add To Cart</Button>
                                                </CardFooter>
                                            </Card>
                                        </GridItem>
                                    )
                                })}
                            </Grid>
                            <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} totalItems={filteredData.length} paginate={paginate} />
                        </Box>
                    </Flex>
                    <Modal isOpen={isOpen} onClose={closePopup} size="md" position="fixed" right="0" closeOnOverlayClick>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Your basket!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {selectedItem && (
                                    <Box>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Title:</strong></td>
                                                    <td>{selectedItem.title}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Price:</strong></td>
                                                    <td>{selectedItem.price_item}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Image:</strong></td>
                                                    <td><Image src={isHovered ? selectedItem.img_src_2 : selectedItem.img_src} alt={selectedItem.title} style={{ height: "100px", width: "100px" }} /></td>
                                                </tr>
                                                {/* You can add more rows for additional details if needed */}
                                            </tbody>
                                        </table>

                                        <Button colorScheme="blue" onClick={handleAddToCart}>Add To Cart</Button>
                                    </Box>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                {/* Any additional footer content can be added here */}
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            )}
        </Container>
    );
}

export default AllProduct;
