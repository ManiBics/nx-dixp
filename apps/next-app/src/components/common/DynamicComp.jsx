import React from 'react';
import { useEffect, useState } from 'react';
import { getPageFromSlug } from '../../utils/content';
import NotFound from './NotFound';
import { getLocale } from '../../utils';
import RetailHeader from 'apps/next-app/src/components/RetailShop/Header';
import CustomerSay from 'apps/next-app/src/components/RetailShop/Home/CustomerSay';
import RetailFooter from 'apps/next-app/src/components/RetailShop/Footer';
import WelcomeBanner from 'apps/next-app/src/components/RetailShop/Home/WelcomeBanner';
import FeaturedProducts from 'apps/next-app/src/components/RetailShop/Home/FeaturedProducts';
import ListingBanner from 'apps/next-app/src/components/RetailShop/Products/ListingBanner';
import ProductListing from 'apps/next-app/src/components/RetailShop/Products/ProductListing';
import ViewCart from 'apps/next-app/src/components/RetailShop/Cart';
import ThankYouPage from 'apps/next-app/src/components/RetailShop/OrderPlaced';
import { useParams } from 'next/navigation';
import { useBackDrop } from 'apps/next-app/src/context/BackDropContext';
import OrdersPage from '../RetailShop/OrdersPage';
import OrderDetails from '../RetailShop/OrderDetails';
import Login from '../RetailShop/Login';
import TabContent from '../RetailShop/Home/TabContent';

const componentMap = {
  headerSection: RetailHeader,
  stats: TabContent,
  bulletPoint: CustomerSay,
  footerSection: RetailFooter,
  brandSection: WelcomeBanner,
  listingBanner: ListingBanner,
  productListing: ProductListing,
  viewCart: ViewCart,
  home: ThankYouPage,
  ordersContent: OrdersPage,
  orderDetailsContent: OrderDetails,
  dynamicImageAndCard: Login,
};

const DynamicComp = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const { showBackDrop, hideBackDrop } = useBackDrop();

  useEffect(() => {
    (async () => {
      showBackDrop();
      const { locale = 'en-US' } = getLocale(params?.slug);
      const slug = '/' + (params?.slug ?? ['']).join('/').replace('index', '');
      const page = await getPageFromSlug(slug, locale);
      setData(page);
      hideBackDrop();
    })();
  }, [params?.slug]);
  return (
    <div>
      {data?.sections?.map((section, idx) => {
        const Component = componentMap[section.type];
        if (!Component)
          return (
            <div key={idx} className="text-red-500 text-center">
              Component is missing
            </div>
          );
        return <Component key={idx} {...section} />;
      })}
      {data.error && <NotFound />}
    </div>
  );
};

export default DynamicComp;
