import styled, { css } from 'styled-components'
import {
  MdSearch,
  MdKeyboardArrowDown,
  MdCheckBox,
  MdCheckBoxOutlineBlank
} from 'react-icons/md'

const iconCSS = css`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  fill: ${({
    theme: {
      colors: { primary }
    }
  }) => primary};
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s ease;
  &:focus,
  &:active {
    opacity: 0.7;
  }
`

export const SearchIcon = styled(MdSearch)`
  ${iconCSS}
`

export const ArrowIcon = styled(MdKeyboardArrowDown)`
  ${iconCSS}
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`

export const CheckboxChecked = styled(MdCheckBox)`
  ${iconCSS}
`
export const Checkbox = styled(MdCheckBoxOutlineBlank)`
  ${iconCSS}
`

export const SearchInput = styled.input`
  border: none;
  border-bottom: 1px solid #5555;
  padding: 6px 14px;
  background-color: ${({ theme: { colors } }) => colors.bg};
  flex: 0.9;
  color: #5555;
  font-size: 2rem;
  ::placeholder {
    color: #5555;
  }

  &:focus {
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.primary};
    ::placeholder {
      color: ${({ theme: { colors } }) => colors.primary};
    }
    color: ${({ theme: { colors } }) => colors.fg};
  }
`
export const Categorie = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-basis: 50%;
`

export const CategorieLabel = styled.label``
