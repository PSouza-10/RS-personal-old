import React from 'react'
import { Container } from './styles'

export function NotFound() {
    return (
        <Container>
            <h1 className="message">Erro 404 - Página não encontrada</h1>
            <h3 className="causes">A página que você tentou acessar não existe ou foi deletada</h3>
        </Container>
    )
}
