import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MOCK = [
  { name: 'Andy', isSelected: false },
  { name: 'Beck', isSelected: false },
  { name: 'Carl', isSelected: false },
]

export default function App() {
  const [data, setData] = useState(MOCK)
  const [isAllSelected, setIsAllSelected] = useState(false)

  const selectAll = () => {
    data.forEach(item => {
      item.isSelected = !isAllSelected
    });

    setIsAllSelected(!isAllSelected)
  }

  const RenderData = ({ item, index }) => {

    const setIsSelected = (item, index) => {
      const updatedData = [...data]

      updatedData[index].isSelected = !item.isSelected

      setData(updatedData)

      var hasNotSelectedItem = (data.filter(item => {
        return item.isSelected === false
      }).length) > 0;

      console.log('aaaa')
      console.log(hasNotSelectedItem)

      if (hasNotSelectedItem) {
        setIsAllSelected(false)
      } else {
        setIsAllSelected(true)
      }
    }

    return (
      <TouchableOpacity
        onPress={() => {
          setIsSelected(item, index)
          //console.log("data???", data)
        }}
        style={[styles.item_btn, { backgroundColor: item.isSelected ? '#7A7A7A' : 'transparent' }]}>

        <Text>{item.name + "setIsSelected: " + item.isSelected + index}</Text>
      </TouchableOpacity>

    )
  }

  return (
    <View style={styles.container}>

      <View>
        <TouchableOpacity
          onPress={() => {
            selectAll()
          }}

          style={[styles.selectAll_btn, { backgroundColor: isAllSelected ? '#7A7A7A' : 'transparent' }]}
        >
          {/* style={[styles.selectAll_btn, { backgroundColor: selectAll ||  ? '#7A7A7A' : 'transparent' }]}> */}
          <Text>全選</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flatlist_container}>
        <FlatList
          data={data}
          renderItem={(cases) => {
            //console.log("cases???", cases)
            return < RenderData item={cases.item} index={cases.index} />

          }}
          keyExtractor={(cases, index) => index.toString()}
          style={{ width: '100%', }}
        />
      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectAll_btn: {
    borderWidth: 1,
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist_container: {
    borderWidth: 1,
    width: 200,
    height: 150,
    alignItems: 'center',
    marginTop: 20,
  },
  item_btn: {
    height: 40,
    justifyContent:
      'center', alignItems: 'center',
  },
});
