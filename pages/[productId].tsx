import React from 'react'
import Link from 'next/link'
import Stripe from 'stripe'
import { GetStaticPaths, GetStaticProps } from 'next'

import stripeConfig from '../config/stripe'

interface Props {
    product: Stripe.Product
}

export const getStaticPaths: GetStaticPaths = async () => {
    const stripe = new Stripe(stripeConfig.secreteKey, {
        apiVersion: '2020-03-02'
    })

    // const _skus = await stripe.skus.list() // essa lista está retornando vazia
    const products = await stripe.products.list()

    const paths = products.data.map(product => ({
        params: {
            productId: product.id
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const stripe = new Stripe(stripeConfig.secreteKey, {
        apiVersion: '2020-03-02'
    })

    const { productId } = params

    const product = await stripe.products.retrieve(productId as string)

    return {
        props: {
            product
        }
    }
}

const Product: React.FC<Props> = ({ product }) => {
    return (
        <div>
            <h1>{product.name}</h1>
            { product.images.length && 
            <img
            style={{
                width: '100px'
            }} 
            src={product.images[0]} alt=""/> }
            {/* <h2>{product.price} BRL</h2> era pra ter uma info de preço mas não retorna... */}

            <Link href="/">Go Back</Link>
        </div>
    )
}

export default Product