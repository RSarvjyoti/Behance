import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import logo from '../Images/logoApp.png'

//navbar
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            // textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
           <Image src={logo} />
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href="/login" to="/login" >
            Sign In
          </Button>
          <Button 
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            href="/register" to="/register"
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
          {/* <Link style={{marginLeft:"10px", marginRight:'10px' , textDecoration:'none'}} href="/" to="/">Home</Link> */}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

//DesktopNav
const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (

    <>
<Box >
  <Link style={{marginLeft:"10px", marginRight:'10px' , textDecoration:'none'}} href="/" to="/">Home</Link>
  <Link style={{marginLeft:"10px", marginRight:'10px', textDecoration:'none'}} href="/allproducts" to="/allproducts">All Products</Link>
</Box>
         
         {/* <Link to="/users" >Users</Link>
         <Link to="/about" >About</Link> */}
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
    </>
  );
};

//DesktopSubNav
const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

// MobileNav
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

// mobile navItem
const MobileNavItem = ({ label, children, href }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  // {
  //   label: "Best Seller",
  //   children: [
  //     {
  //       label: "Special Offers",
  //       href: "#",
  //     },
  //     {
  //       label: "Buy1 Get 1Free",
  //       href: "#",
  //     },
  //   ],
  // },

  //Shop set refill about
  // {
  //   label: "Shop",
  //   children: [
  //     {
  //       label: "Special Offers",
  //       href: "#",
  //     },
  //     {
  //       label: "Buy1 Get 1Free",
  //       href: "#",
  //     },
  //   ],
  // },
  //
  {
    label: "Set",
    children: [
      {
        label: "All Set",
        href: "#",
      },
      {
        label: "Travel Set",
        href: "#",
      },
      {
        label: "Gift Set",
        href: "#",
      },
    ],
  },
  //refill station
  {
    label: "Refill Station",
    children: [
      {
        label: "All Refills",
        href: "#",
      },
      {
        label: "Skin Care Refill",
        href: "#",
      },
      {
        label: "Hand Care Refill",
        href: "#",
      },
      {
        label: "Body Care Refill",
        href: "#",
      },
      {
        label: "Oral Care Refill",
        href: "#",
      },
    ],
  },
  //about us
  {
    label: "About us",
    children: [
      {
        label: "All About Hann",
        href: "#",
      },
      {
        label: "Our Story",
        href: "#",
      },
      {
        label: "Sobremesa Talks",
        href: "#",
      },
    ],
  },
];

// 400 lines
// import { useState } from 'react';
// import {
//   Box,
//   Flex,
//   Text,
//   IconButton,
//   Button,
//   Stack,
//   Collapse,
//   Icon,
//   Link,
//   Image,
//   useColorModeValue,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from '@chakra-ui/react';
// import { HamburgerIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
// import { ChevronDownIcon } from '@chakra-ui/icons';

// // Navbar
// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const onToggle = () => setIsOpen(!isOpen);

//   return (
//     <Box>
//       {/* Head Navbar */}
//       <Flex
//         bg={useColorModeValue('white', 'gray.800')}
//         color={useColorModeValue('gray.600', 'white')}
//         minH={'60px'}
//         py={{ base: 2 }}
//         px={{ base: 4 }}
//         borderBottom={1}
//         borderStyle={'solid'}
//         borderColor={useColorModeValue('gray.200', 'gray.900')}
//         align={'center'}
//       >
//         <Text fontFamily={'heading'} color={useColorModeValue('gray.800', 'white')}>
//           <Image src='../image/Haan_logo.png' alt='Logo' />
//         </Text>

//         <Stack
//           flex={{ base: 1, md: 0 }}
//           justify={'flex-end'}
//           direction={'row'}
//           spacing={6}
//         >
//           <Button
//             as={'a'}
//             fontSize={'sm'}
//             fontWeight={400}
//             variant={'link'}
//             href={'#'}
//           >
//             Sign In
//           </Button>
//           <Button
//             as={'a'}
//             display={{ base: 'none', md: 'inline-flex' }}
//             fontSize={'sm'}
//             fontWeight={600}
//             color={'white'}
//             bg={'pink.400'}
//             href={'#'}
//             _hover={{
//               bg: 'pink.300',
//             }}
//           >
//             Sign Up
//           </Button>
//         </Stack>

//         {/* Hamburger Icon for Mobile */}
//         <Flex
//           ml={{ base: -2 }}
//           display={{ base: 'flex', md: 'none' }}
//         >
//           <IconButton
//             onClick={onToggle}
//             icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
//             variant={'ghost'}
//             aria-label={'Toggle Navigation'}
//           />
//         </Flex>
//       </Flex>

//       {/* Sub Navbar */}
//       <Collapse in={isOpen} animateOpacity>
//         <MobileNav />
//       </Collapse>
//     </Box>
//   );
// };

// // DesktopNav
// const DesktopNav = () => {
//   const linkColor = useColorModeValue('gray.600', 'gray.200');
//   const linkHoverColor = useColorModeValue('gray.800', 'white');
//   const popoverContentBgColor = useColorModeValue('white', 'gray.800');

//   return (
//     <Stack direction={'row'} spacing={4}>
//       {NAV_ITEMS.map((navItem) => (
//         <Box key={navItem.label}>
//           <Popover trigger={'hover'} placement={'bottom-start'}>
//             <PopoverTrigger>
//               <Link
//                 p={2}
//                 href={navItem.href ?? '#'}
//                 fontSize={'sm'}
//                 fontWeight={500}
//                 color={linkColor}
//                 _hover={{
//                   textDecoration: 'none',
//                   color: linkHoverColor,
//                 }}>
//                 {navItem.label}
//               </Link>
//             </PopoverTrigger>

//             {navItem.children && (
//               <PopoverContent
//                 border={0}
//                 boxShadow={'xl'}
//                 bg={popoverContentBgColor}
//                 p={4}
//                 rounded={'xl'}
//                 minW={'sm'}>
//                 <Stack>
//                   {navItem.children.map((child) => (
//                     <DesktopSubNav key={child.label} {...child} />
//                   ))}
//                 </Stack>
//               </PopoverContent>
//             )}
//           </Popover>
//         </Box>
//       ))}
//     </Stack>
//   );
// };

// // DesktopSubNav
// const DesktopSubNav = ({ label, href, subLabel }) => {
//   return (
//     <Link
//       href={href}
//       role={'group'}
//       display={'block'}
//       p={2}
//       rounded={'md'}
//       _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
//       <Stack direction={'row'} align={'center'}>
//         <Box>
//           <Text
//             transition={'all .3s ease'}
//             _groupHover={{ color: 'pink.400' }}
//             fontWeight={500}>
//             {label}
//           </Text>
//           <Text fontSize={'sm'}>{subLabel}</Text>
//         </Box>
//         <Flex
//           transition={'all .3s ease'}
//           transform={'translateX(-10px)'}
//           opacity={0}
//           _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
//           justify={'flex-end'}
//           align={'center'}
//           flex={1}>
//           <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   );
// };

// // MobileNav
// const MobileNav = () => {
//   return (
//     <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
//       {NAV_ITEMS.map((navItem) => (
//         <MobileNavItem key={navItem.label} {...navItem} />
//       ))}
//     </Stack>
//   );
// };

// // Mobile Nav Item
// const MobileNavItem = ({ label, children, href }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const onToggle = () => setIsOpen(!isOpen);

//   return (
//     <Stack spacing={4} onClick={children && onToggle}>
//       <Flex
//         py={2}
//         as={Link}
//         href={href ?? '#'}
//         justify={'space-between'}
//         align={'center'}
//         _hover={{
//           textDecoration: 'none',
//         }}
//       >
//         <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition={'all .25s ease-in-out'}
//             transform={isOpen ? 'rotate(180deg)' : ''}
//             w={6}
//             h={6}
//           />
//         )}
//       </Flex>

//       <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
//         <Stack mt={2} pl={4} borderLeft={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.700')} align={'start'}>
//           {children &&
//             children.map((child) => (
//               <Link key={child.label} py={2} href={child.href}>
//                 {child.label}
//               </Link>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   );
// };

// // NAV ITEMS
// const NAV_ITEMS = [
//   {
//     label: 'All Products',
//     children: [
//       { label: 'Hand Sanitizers', href: '#' },
//       { label: 'Special Offers', href: '#' },
//     ],
//   },
//   {
//     label: 'Mothers Day',
//     children: [
//       { label: 'Special Offers', href: '#' },
//       { label: 'Buy1 Get 1Free', href: '#' },
//     ],
//   },
//   {
//     label: 'Best Seller',
//     children: [
//       { label: 'Special Offers', href: '#' },
//       { label: 'Buy1 Get 1Free', href: '#' },
//     ],
//   },
//   {
//     label: 'Shop',
//     children: [
//       { label: 'Special Offers', href: '#' },
//       { label: 'Buy1 Get 1Free', href: '#' },
//     ],
//   },
//   {
//     label: 'Set',
//     children: [
//       { label: 'All Set', href: '#' },
//       { label: 'Travel Set', href: '#' },
//       { label: 'Gift Set', href: '#' },
//     ],
//   },
//   {
//     label: 'Refill Station',
//     children: [
//       { label: 'All Refills', href: '#' },
//       { label: 'Skin Care Refill', href: '#' },
//       { label: 'Hand Care Refill', href: '#' },
//       { label: 'Body Care Refill', href: '#' },
//       { label: 'Oral Care Refill', href: '#' },
//     ],
//   },
//   {
//     label: 'About us',
//     children: [
//       { label: 'All About Hann', href: '#' },
//       { label: 'Our Story', href: '#' },
//       { label: 'Sobremesa Talks', href: '#' },
//     ],
//   },
// ];
