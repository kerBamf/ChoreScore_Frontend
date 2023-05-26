import { useState, useEffect } from 'react'
import { quotesLoader } from '../apiCalls'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Footer = () => {
    const [quote, setQuote] = useState({})

    async function getQuote() {
        let rawQuote = null
        try{
        rawQuote = await quotesLoader()
        setQuote(rawQuote)
        } catch(err) {
            console.log(err)
        } 
    }

    useEffect(() => {
        const interval = setInterval(getQuote, 10000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    

    if (quote) {
    return ( 
        <Container className="quoteBox">
            <Row>
                <Col>
                    <p className="quote">"{quote.quote}"</p>
                </Col>
            </Row>
            <Row>
                <Col sm={{offset: 7}}>
                    {quote.author ? <p className="quoteAuthor">-{quote.author}</p> : <p className="quoteAuthor justify-content-end">-Unknown</p>}
                </Col>
            </Row>
        </Container>
    )
    } else {
        return (<p>Loading Quotes...</p>)
    }

}

export default Footer