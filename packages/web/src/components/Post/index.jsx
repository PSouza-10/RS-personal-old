import React from 'react'
import {IoMdArrowRoundForward as ArrowIcon} from 'react-icons/io'
import {
  Container,
  PostTitle,
  PostImage,
  PostInfo,
  PostSubtitle,
  Avatar,
  StyledLink as Link
} from './styles'

export function Post({_id, title, image, author, avatar, date, subtitle }) {
  return (
    <Container>
      <PostImage src={image} alt={title} />
      <PostTitle>
        <Avatar src={avatar} alt={author} />
        <span>{title}</span>
      </PostTitle>
      <PostInfo>
        <span>{author} · </span>
        <span>{date}</span>
      </PostInfo>
      <PostSubtitle>{subtitle}</PostSubtitle>
      <Link to={`/article/${_id}`}>VER MAIS <ArrowIcon/></Link>
    </Container>
  )
}
