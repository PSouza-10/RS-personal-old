import React, { useContext, useState } from 'react'
import { Collapse, Container } from 'propstyledui'
import {
  ArrowIcon,
  SearchIcon,
  SearchInput,
  Checkbox,
  CheckboxChecked,
  Categorie,
  CategorieLabel
} from './styles'
import { css, ThemeContext } from 'styled-components'

export function Filter() {
  const [collapseOpen, setCollapse] = useState(false)
  const [categories, setCategories] = useState([
    {
      checked: true,
      text: 'Nutrição'
    },
    {
      checked: true,
      text: 'Exercício'
    },
    {
      checked: true,
      text: 'Outros'
    }
  ])
  const handleCollapse = () => setCollapse(!collapseOpen)
  const { colors} = useContext(ThemeContext)
  return (
    <Container direction='column' padding="0 10px" bg={colors.bg} align='stretch' justify='start' CSS={css`position:sticky; top: 50px; z-index: 2; border-radius: 0;`}>
      <Search handleCollapse={handleCollapse} collapseOpen={collapseOpen} />
      <Collapse
        open={collapseOpen}
        expand='vertical'
        height='70px'
        
        duration='0.3s'>
        <Categories items={categories} setItems={setCategories} />
      </Collapse>
    </Container>
  )
}

const Search = ({ handleCollapse,collapseOpen }) => {
  return (
    <Container justify='between' align='center' padding="0 0 10px 0">
      <SearchIcon />
      <SearchInput />
      <ArrowIcon onClick={handleCollapse} open={collapseOpen}/>
    </Container>
  )
}

const Categories = ({ items = [], setItems }) => {
  const toggleCheck = index => {
    let newItems = [...items]

    newItems[index] = {
      ...newItems[index],
      checked: !newItems[index].checked
    }

    setItems(newItems)
  }

  return (
    <Container
      direction='row'
      width='100%'
      padding='16px 22px'
      CSS={css`
        flex-wrap: wrap;
      `}>
      {items.map((item, index) => (
        <Categorie key={index} onClick={() => toggleCheck(index)}>
          {item.checked ? <CheckboxChecked /> : <Checkbox />}
          <CategorieLabel>{item.text}</CategorieLabel>
        </Categorie>
      ))}
    </Container>
  )
}
