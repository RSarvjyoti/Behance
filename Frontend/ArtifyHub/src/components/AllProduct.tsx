import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Grid, GridItem, Box, Flex, Button, Card, CardHeader, CardBody, CardFooter, 
    Image,Stack, Heading, Text, Divider
 } from '@chakra-ui/react'

export default function AllProduct() {
    const [myData, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get('https://behance-z9se.onrender.com/data')
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => setError(error.massage))
    }, [])

    return (

        <Container maxW={['container.sm', 'container.md', 'container.lg', 'container.xl']} centerContent>
            <Flex direction='row' justifyContent='space-between' p={2} w={'100%'}>
                <Button colorScheme='black' variant='outline'>
                    Filter
                </Button>
                <p><span>{myData.length}</span> Products</p>
            </Flex>


            <Flex direction={['column', 'column', 'row', 'row']}>
                <Box w={['100%', '100%', '80%', '80%']} p={4} ml={['0', '0', '10', '10']} mb={['5', '5', '0', '0']}>
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={3}>
                        {myData.map((post) => {

                            const { id, img_src, img_src_2, title, price_item, price_item_2, price_item_3 } = post;

                            return (
                                <GridItem key={id} w='100%' h='auto'>
                                    {/* <div className='card'>
                                        <img src={img_src} alt="" />
                                        <p>{title}</p>
                                    </div> */}

                                    <Card maxW='sm'>
                                        <CardBody>
                                            <Image
                                                src={img_src}
                                                alt='Green double couch with wooden legs'
                                            />
                                            <Stack mt='6' spacing='3'>
                                                <Text text-aling >
                                                    <a href="#">{title}</a>
                                                </Text>
                                                <Text color='blue.600' fontSize='2xl'>
                                                 {price_item_2}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                        <CardFooter  style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button borderRadius= '50px' border={'1px'} bg='none' >
                                                    Add to cart
                                                </Button>
                                        </CardFooter>
                                    </Card>

                                </GridItem>
                            )
                        })}
                    </Grid>
                </Box>
            </Flex>
        </Container>


    )
}
