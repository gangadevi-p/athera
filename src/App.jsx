import { ShopProvider } from './lib/shop'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Categories from './pages/Categories'
import Spaces from './pages/Spaces'
import Space from './pages/Space'
import Wishlist from './pages/Wishlist'
import Account from './pages/Account'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Done from './pages/Done'
import Track from './pages/Track'
import Help from './pages/Help'
import DesignSystem from './pages/DesignSystem'
import NotFound from './pages/NotFound'

/**
 * Cart, wishlist and account state sit above the layout so they survive every
 * navigation.
 */
function Root() {
  return (
    <ShopProvider>
      <Layout />
    </ShopProvider>
  )
}

/**
 * A data router rather than <BrowserRouter>, because view transitions — the
 * shared-image expansion when a piece opens — are only available through
 * RouterProvider.
 */
export const routes = [
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/p/:id', element: <Product /> },
      { path: '/categories', element: <Categories /> },
      { path: '/spaces', element: <Spaces /> },
      { path: '/spaces/:id', element: <Space /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/account', element: <Account /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/done', element: <Done /> },
      { path: '/track', element: <Track /> },
      { path: '/help', element: <Help /> },
      { path: '/design-system', element: <DesignSystem /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
