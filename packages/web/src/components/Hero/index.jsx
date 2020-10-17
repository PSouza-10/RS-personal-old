import React from 'react'
import {Call, Container, Image, AppleIcon, AndroidIcon} from './styles'
import {trainer} from '../image'
import useDetectPlatform from '../../hooks/useDetectPlatform'

export  function Hero() {
    const device = useDetectPlatform()
    const icon = device === 'Apple' ? <AppleIcon/> : <AndroidIcon/>
    const appLink =  device === 'Apple' ? 'https://www.apple.com/app-store/': 'https://play.google.com/store'
    
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
                    <a href={appLink}> <button> {icon}Baixe o aplicativo</button></a>
                    <button>Conheça o Personal</button>
                </span>
            </Call>
        </Container>
    )
}
