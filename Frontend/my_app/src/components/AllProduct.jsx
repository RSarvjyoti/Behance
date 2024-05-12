import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Container, Grid, GridItem, Box, Flex, Button, Card, CardBody, CardFooter,
    Image, Stack, Text, LinkBox, LinkOverlay, Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Link,
} from '@chakra-ui/react';
import { Pagination } from './Pagination';
import SearchBar from './SearchBar';

const ITEMS_PER_PAGE = 20;

const AllProduct = () => {

    const [myData, setData] = useState([]);
    const [error, setError] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        axios.get('https://behance-z9se.onrender.com/data')
            .then((res) => {
                setData(res.data);
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

    return (
        <Container maxW="container.xl" centerContent>
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
                                                        <Text text-aling style={flex}>
                                                            <LinkOverlay href='#'> {title} </LinkOverlay>
                                                        </Text>
                                                        <Text fontSize='1xl' style={flex}>
                                                            {isHovered ? price_item_2 : price_item}
                                                        </Text>
                                                    </Stack>
                                                </Box>
                                            </LinkBox>
                                        </CardBody>
                                        <CardFooter style={{ ...flex }} >


                                            {/* <Button borderRadius='50px' border={'1px'} bg='none'>
                                                Add to cart
                                            </Button> */}

                                            <Button onClick={openPopup}>Add To Cart</Button>
                                            <Modal isOpen={isOpen} onClose={closePopup} size="md">
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Email</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Box>
                                                            <h1>Good afternoon.</h1>
                                                            <Button colorScheme="blue">Subscribe for more access</Button>
                                                            <Link color="black" textDecoration="underline" href="#">
                                                                Log out
                                                            </Link>
                                                        </Box>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        {/* Any additional footer content can be added here */}
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>



                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            )
                        })}
                    </Grid>
                    <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} totalItems={filteredData.length} paginate={paginate} />
                </Box>
            </Flex>
        </Container>
    );
}

export default AllProduct;
