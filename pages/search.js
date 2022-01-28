import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';
import noresults from '../assets/images/noresults.svg';
import { fetchApi, baseUrl } from '../utils/fetchApi';
// data from getStaticProps will be sent to this function.
const Search = ({ properties }) => {

    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex
                cursor="pointer"
                background="gray.100"
                borderBottom="1px"
                borderColor="gray.200"
                p="2"
                fontWeight="black"
                fontSize="lg"
                justifyContent="center"
                alignItems="center"
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)} //dropdown for search filter
            >
                <Text>Search Property By Filters</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter}></Icon>

            </Flex>

            {/* Hide and show the search Filters component */}
            {searchFilters && <SearchFilters />}
            <Text fontSize="2xl" p="4" fontWeight="bold">
                Properties {router.query.purpose}
            </Text>

            {/* //show properties based on query i.e. buy or rent */}
            <Flex flexWrap="wrap">
                {properties.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            {properties.length === 0 && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5" >
                    <Image alt="No Result" src={noresults} />
                    <Text fontSize="2xl" marginTop="3">No results found</Text>
                </Flex>
            )}
        </Box>
    )

}


// https://nextjs.org/docs/basic-features/data-fetching
export async function getServerSideProps({ query }) {
    //const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
    // to pass values to search page through props we need to set it inside
    // this function.


    //filter everything below - with default values
const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000'; // when added to big number got error of serializing json
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

    // create query
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

    //we send data through props.
    return {

        props: {
        
        properties: data?.hits,
        
        },
        
        };
        
        }
export default Search;

