import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Container, Grid, GridItem, Box, Flex, Button, Card, CardBody, CardFooter,
    Image, Stack, Text, LinkBox, LinkOverlay
} from '@chakra-ui/react';
import { Pagination } from './Pagination';

interface Product {
    id: number;
    img_src: string;
    img_src_2: string;
    title: string;
    price_item: string;
    price_item_2: string;
}

const ITEMS_PER_PAGE = 20;

export const AllProduct: React.FC = () => {
    
    const [myData, setData] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        axios.get<Product[]>('https://behance-z9se.onrender.com/data')
            .then((res) => {
                setData(res.data);
            })
            .catch(() => setError(error))
    }, []);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = myData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <Container maxW={['container.sm', 'container.md', 'container.lg', 'container.xl']} centerContent>
            <Flex direction='row' justifyContent='space-between' p={2} w={'100%'}>
                <Button colorScheme='black' variant='outline'>
                    Filter
                </Button>
                <p><span>{currentItems.length}</span> Products</p>
            </Flex>

            <Flex direction={['column', 'column', 'row', 'row']}>
                <Box w={['100%', '100%', '80%', '80%']} p={4} ml={['0', '0', '10', '10']} mb={['5', '5', '0', '0']}>
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={3}>
                        {currentItems.map((post) => {
                            const { id, img_src, img_src_2, title, price_item, price_item_2 } = post;

                            const flex: React.CSSProperties = {
                                display: 'flex', justifyContent: 'center'
                            };

                            return (
                                <GridItem key={id} w='100%' h='auto'>
                                    <Card maxW='sm'>
                                        <CardBody>
                                            <LinkBox onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                                <Box>
                                                    <Image
                                                        src={isHovered ? img_src_2 : img_src}
                                                        alt={title}
                                                    />
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
                                        <CardFooter style={flex}>
                                            <Button borderRadius='50px' border={'1px'} bg='none' >
                                                Add to cart
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            )
                        })}
                    </Grid>
                    {/* Here added the pagination component */}
                    <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} totalItems={myData.length} paginate={paginate} />
                </Box>
            </Flex>
        </Container>
    );
}