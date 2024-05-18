import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Container, Grid, GridItem, Box, Flex, Button, Card, CardBody, CardFooter,
    Image, Stack, Text, LinkBox, LinkOverlay, Select, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
    Skeleton, SkeletonText, SkeletonCircle
} from '@chakra-ui/react';
import { Pagination } from './Pagination';
import SearchBar from './SearchBar';

const ITEMS_PER_PAGE = 20;

const AllProduct = () => {
    const [myData, setData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        axios.get('https://behance-z9se.onrender.com/data')
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(() => setError(error));
    }, [error]);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const filteredData = myData
        .filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(item => {
            if (priceFilter === "low") return item.price_item < 50;
            if (priceFilter === "medium") return item.price_item >= 50 && item.price_item <= 100;
            if (priceFilter === "high") return item.price_item > 100;
            return true;
        })
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title);
            } else if (sortOrder === "desc") {
                return b.title.localeCompare(a.title);
            }
            return 0;
        });

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCartOpen = () => setIsCartOpen(true);
    const handleCartClose = () => setIsCartOpen(false);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price_item * item.quantity, 0);
    };

    return (
        <Container maxW="container.xl" centerContent>
            <Flex direction='row' justifyContent='space-between' p={2} w='100%' alignItems="center" flexWrap="wrap">
                <Flex alignItems="center" mb={{ base: 2, md: 0 }}>
                    <Button colorScheme='black' variant='outline' mr={2}>
                        Filter
                    </Button>
                    <Select placeholder="Price Filter" onChange={(e) => setPriceFilter(e.target.value)} w="150px">
                        <option value="all">All</option>
                        <option value="low">Low (&lt; $50)</option>
                        <option value="medium">$50 - $100</option>
                        <option value="high">&gt; $100</option>
                    </Select>
                    <Select placeholder="Sort Order" onChange={(e) => setSortOrder(e.target.value)} w="150px" ml={2}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Select>
                </Flex>
                <Text><span>{currentItems.length}</span> Products</Text>
                <SearchBar setSearchQuery={setSearchQuery} />
                <Button onClick={handleCartOpen}>View Cart ({cartItems.length})</Button>
            </Flex>

            <Flex direction={['column', 'column', 'row', 'row']} justify="center">
                <Box w={['100%', '100%', '80%', '80%']} p={4} mb={10}>
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={3}>
                        {isLoading ? (
                            [...Array(ITEMS_PER_PAGE)].map((_, index) => (
                                <GridItem key={index} w='100%' h='auto'>
                                    <Card maxW='300px' h='450px' style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                        <CardBody>
                                            <Skeleton height="200px" />
                                            <Stack mt='6' spacing='3'>
                                                <SkeletonText mt='4' noOfLines={2} spacing='4' />
                                            </Stack>
                                        </CardBody>
                                        <CardFooter>
                                            <Skeleton height="40px" width="100px" />
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            ))
                        ) : (
                            currentItems.map((post) => {
                                const { id, img_src, img_src_2, title, price_item, price_item_2 } = post;

                                const flex = {
                                    display: 'flex', justifyContent: 'center'
                                };

                                return (
                                    <GridItem key={id} w='100%' h='auto'>
                                        <Card maxW='300px' h='450px' style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                            <CardBody>
                                                <LinkBox>
                                                    <Box>
                                                        <Box w='200px' h='200px' style={{ overflow: 'hidden' }}>
                                                            <Image
                                                                src={isHovered ? img_src_2 : img_src}
                                                                alt={title}
                                                            />
                                                        </Box>
                                                        <Stack mt='6' spacing='3'>
                                                            <Text text-align="center" style={flex}>
                                                                <LinkOverlay href='#'> {title} </LinkOverlay>
                                                            </Text>
                                                            <Text fontSize='1xl' style={flex}>
                                                                {isHovered ? price_item_2 : price_item}
                                                            </Text>
                                                        </Stack>
                                                    </Box>
                                                </LinkBox>
                                            </CardBody>
                                            <CardFooter style={{ ...flex }}>
                                                <Button
                                                    borderRadius='50px'
                                                    border={'1px'}
                                                    bg='none'
                                                    onClick={() => addToCart(post)}
                                                >
                                                    Add to cart
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </GridItem>
                                );
                            })
                        )}
                    </Grid>
                    <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} totalItems={filteredData.length} paginate={paginate} />
                </Box>
            </Flex>

            <Drawer isOpen={isCartOpen} placement="right" onClose={handleCartClose}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Your Cart</DrawerHeader>

                        <DrawerBody>
                            {cartItems.length === 0 ? (
                                <Text>Your cart is empty</Text>
                            ) : (
                                cartItems.map((item) => (
                                    <Flex key={item.id} mb={4} justifyContent="space-between" alignItems="center">
                                        <Image src={item.img_src} alt={item.title} boxSize="50px" />
                                        <Box flex="1" mx={2}>
                                            <Text>{item.title}</Text>
                                            <Text>${item.price_item}</Text>
                                            <Flex alignItems="center">
                                                <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                                                <Text mx={2}>{item.quantity}</Text>
                                                <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                                            </Flex>
                                        </Box>
                                        <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                                    </Flex>
                                ))
                            )}
                        </DrawerBody>

                        <DrawerFooter>
                            <Box w="100%">
                                <Text fontSize="lg">Total: ${getTotalPrice().toFixed(2)}</Text>
                                <Button colorScheme="blue" w="100%">Checkout</Button>
                            </Box>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </Container>
    );
};

export default AllProduct;
