import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  View,
  ActivityIndicator,
  Pressable,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  Card,
  Screen,
  ModalView,
  PillButton,
  Text,
  SearchBar,
} from '@components';
import { tailwind, getColor } from '@tailwind';
import ChevronIcon from '../../assets/icons/arrow-left.svg';
import { useForm } from 'react-hook-form';
import {
  GetAllSpeakersDocument,
  GetAllIndustriesDocument,
  GetIndustryInfoDocument,
  GetAttributesFromIndustryDocument,
  Speaker,
} from '@generated/graphql';

type AttributeValue = {
  id: string
  value: string
}

interface Props {
  name: string;
  selected: string;
  ids: String[];
  setAttribute: () => void;
}

const AttributeButton = ({ name, selected, ids, setAttribute }: Props) => {
  let currSelected = ids.find(id => id === selected);

  return (
    <Pressable
      onPress={setAttribute}
      style={tailwind('flex self-center rounded-full')}>
      <Text style={tailwind(`text-sm text-center ${currSelected ? 'text-lasswho-accent' : 'text-white'} px-2 m-2`)}>
        {name}
      </Text>
    </Pressable>
  )
}

export const HomeScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(false);

  const [speaker, setSpeaker] = useState<Speaker>();
  const [chosenIndustry, setChosenIndustry] = useState([]);
  const [chosenAttributeValueIds, setChosenAttributeValueIds] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [currentParentId, setCurrentParentId] = useState(0);
  const [parentIds, setParentIds] = useState([]);
  const [industryId, setIndustryId] = useState();

  const [getAllSpeakers, { data, loading }] = useLazyQuery(GetAllSpeakersDocument,
    {
      onError: ({ graphQLErrors }) => {
        if (graphQLErrors) {
          graphQLErrors.map((error) => {
            console.log(error);
          })
        }
      }
    },
  );
  const { data: industryData } = useQuery(GetAllIndustriesDocument);
  const { data: industryInfoData } = useQuery(GetIndustryInfoDocument, {
    variables: { id: currentParentId.toString() },
  });
  const { data: attributeData } = useQuery(GetAttributesFromIndustryDocument, {
    variables: { industry: String(currentParentId) },
  });

  useEffect(() => {
    getAllSpeakers();
  }, [getAllSpeakers]);

  const openModal = (speaker: Speaker) => {
    setModalVisible(true);
    setSpeaker(speaker);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getSpeakersQuery = (industryID: number, name?: string, attributes?: []) => {
    getAllSpeakers({
      variables: {
        industry: industryID,
        attributes: attributes,
        name: name,
      },
    });
  };

  const resetFilters = () => {
    setCurrentParentId(0);
    setIndustryId(null);
    getSpeakersQuery(null);
  };

  const previousFilter = () => {
    const chosenIndustries = chosenIndustry.filter(
      (item) => item !== chosenIndustry[chosenIndustry.length - 1],
    );

    setChosenIndustry(chosenIndustries);

    getAllSpeakers({
      variables: {
        industry: Number(currentParentId),
      },
    });

    const chosenParentIds = parentIds.filter(
      (item) => item !== currentParentId,
    );

    setParentIds(chosenParentIds);

    if (chosenParentIds.length > 0) {
      setIndustryId(parseInt(currentParentId));
      setCurrentParentId(chosenParentIds[chosenParentIds.length - 1]);
      getSpeakersQuery(Number(chosenParentIds[chosenParentIds.length - 1]));
      resetAttributes();
      return;
    }

    resetFilters();
  };

  const saveFilters = (filter) => {
    setCurrentParentId(filter?.id);
    setParentIds([...parentIds, filter?.id]);
    setIndustryId(filter?.id);
    setChosenIndustry([...chosenIndustry, filter?.name]);
    getSpeakersQuery(Number(currentParentId));
  };

  const searchForSpeaker = (value: string) => {
    getSpeakersQuery(Number(currentParentId), value);
  };
  
  const resetAttributes = () => {
    setChosenAttributeValueIds([]);  
    setAttributeValues([])
  }

  const attributeSelectionHandler = (attributeID: string, attributeValueID: string) => {
    let attrValueIDArray: string[] = chosenAttributeValueIds;
    let selectedValues: AttributeValue[] = attributeValues;
    let selectedValueIndex: number = attrValueIDArray.findIndex(id => id === attributeValueID);
    let valueAlreadySelected: boolean = selectedValueIndex > -1 ? true : false;

    if (valueAlreadySelected) {
      selectedValues = selectedValues.filter((selectedValueObject) => selectedValueObject.value !== attributeValueID);
    } else {
      selectedValues.push({
        id: attributeID,
        value: attributeValueID
      })
    }
    setAttributeValues(selectedValues);
    setChosenAttributeValueIds(selectedValues.map(selectedValue => selectedValue.value));
    getSpeakersQuery(Number(currentParentId), '', selectedValues);
  }

  return (
    <Screen backgroundColor={getColor('lasswho-main')}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ModalView onClose={closeModal} player={speaker} />
      </Modal>

      <SearchBar
        placeholder="Find your hero speaker"
        control={control}
        handleSearch={searchForSpeaker}
      />
      <View style={tailwind('pt-4 flex items-center')}>
        <View style={tailwind('flex flex-row w-full justify-between px-4')}>
          {chosenIndustry !== [] ? (
            <View
              style={tailwind('flex flex-row flex-wrap items-start m-2 w-3/4')}
            >
              <Text
                style={tailwind('text-white')}
                ellipsizeMode="head"
                numberOfLines={1}
              >
                {chosenIndustry.join(' / ')}
              </Text>
            </View>
          ) : null}
          <View style={tailwind('m-2 flex-row')}>
            {industryId ? (
              <Pressable style={tailwind('p-1')} onPress={previousFilter}>
                <ChevronIcon fill="white" height={16} width={16} />
              </Pressable>
            ) : null}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tailwind(
            'flex-row flex-wrap items-start justify-center',
          )}
        >
          {!industryId ? (
            <View style={tailwind('flex-row flex-wrap')}>
              {industryData?.industries?.map((industry) => (
                <PillButton
                  key={industry?.id}
                  text={industry?.name}
                  onPressHandle={() => {
                    saveFilters(industry);
                    getSpeakersQuery(Number(industry?.id));
                  }}
                />
              ))}
            </View>
          ) : (
            <View style={tailwind('flex-row flex-wrap')}>
              {industryInfoData?.industryInfo?.child?.map((industry) => (
                <PillButton
                  key={industry?.id}
                  text={industry?.name}
                  onPressHandle={() => {
                    saveFilters(industry);
                    getSpeakersQuery(Number(industry?.id));
                  }}
                />
              ))}
            </View>
          )}
        </ScrollView>

        {/* Commenting out attributes for now until design is confirmed */}

        {attributeData?.attributes?.map((attribute) => {
          if (attribute?.type === 'multi') {
            return (
              <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tailwind(
                  'flex-row flex-wrap items-start justify-center m-2',
                )}>
                {Object.values(attribute?.values).map((attributeValue) => {                  
                  return (
                    <AttributeButton
                      name={attributeValue.name}
                      selected={attributeValue?.id}
                      ids={chosenAttributeValueIds}
                      setAttribute={() => {
                        attributeSelectionHandler(attribute.id, attributeValue.id, chosenAttributeValueIds);                        
                      }} />
                  )
                })}
              </ScrollView>
            )
          }
        })}


      </View>

      {/* TODO: Make seperate list component  */}

      {loading ? (
        <ActivityIndicator
          size="large"
          color={getColor('lasswho-accent')}
          style={tailwind('mt-12')}
        />
      ) : data && data.speakers?.length ? (
        <View
          style={tailwind(
            `flex ${data.speakers.length < 3 ? 'items-start' : 'items-center'}`,
          )}
        >
          <FlatList
            numColumns={3}
            showsVerticalScrollIndicator={false}
            style={tailwind('mb-48')}
            data={data.speakers}
            renderItem={({ item }) => {
              return (
                <View key={item?.id} style={tailwind('py-2 px-1')}>
                  <Pressable onPress={() => openModal(item)}>
                    <Card
                      name={item?.name || ''}
                      currencySymbol={item?.currency_symbol}
                      picture={item?.listing_image!}
                      price={item?.price_min}
                      key={item?.id}
                    />
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <Text style={tailwind('mt-10 text-lasswho-accent text-center')}>
          No results found, please reset and try again.
        </Text>
      )}
    </Screen>
  );
};
