import { GetStaticProps } from "next"
import Stripe from "stripe"

import stripeConfig from '../config/stripe'
import Link from "next/link"


interface Props {
  products: Stripe.Product[]
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(stripeConfig.secreteKey, {
    apiVersion: '2020-03-02'
  })

  // const _skus = await stripe.skus.list() // essa lista está retornando vazia
  const products = await stripe.products.list()

  return {
    props: {
      products: products.data
    }
  }
}

const HomePage: React.FC<Props> = ({ products }) => {
  return (
    <>
      <h1>Simple Stripe Store</h1>

      {products.map(product => (
        <div key={product.id}>

          <h1>{product.name}</h1>
          {product.images.length &&
            <img
              style={{
                width: '100px'
              }}
              src={product.images[0]} alt="" />}
          {/* <h2>{product.price} BRL</h2> era pra ter uma info de preço mas não retorna... */}

          <Link href={`/${product.id}`}>Visit page</Link>
          <hr/>
        </div>
      ))}
    </>
  )
}

export default HomePage