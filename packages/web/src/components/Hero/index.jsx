import React from 'react'
import {Call, Container, Image} from './styles'
import {trainer} from '../image'

export  function Hero() {
    return (
        <Container >
            <Image src={trainer} alt="dssd"/>
            <Call>
                <h1>Corpo, mente e alma sincronizados</h1>
                <p>
                    Sou formado em nutrição e educação física, e especializado em coaching. Hoje ofereço acompanhamento 
                    como meio de alcançar o potencial máximo para o corpo, mente e alma.

                </p>
                <span>
                    <button>Baixe o aplicativo</button>
                    <button>Conheça o Personal</button>
                </span>
            </Call>
        </Container>
    )
}
