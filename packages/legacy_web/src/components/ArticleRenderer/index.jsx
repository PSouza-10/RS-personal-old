import React from 'react'
import {Container} from './styles'
import parse from 'html-react-parser';

export function ArticleRenderer() {
    const content = [
        '<img src="https://i.imgur.com/czCMHzw.jpg?1"></img>',
        '<h2 class="test">Hello World</br> sadads</h2>',
    ]
    const classNames = {
        'test' : {
            'color' : 'red',
            'font-size' : '5rem'
        }
    }
    return (
        <Container styles={classNames}>
            {
                content.map(element => parse(element))
            }       
        </Container>
    )
}
