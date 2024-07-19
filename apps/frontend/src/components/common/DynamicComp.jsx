import React from 'react';
import { useEffect, useState } from 'react';
import { getPageFromSlug } from '../../utils/content';
import NotFound from '../../components/common/NotFound';
import { getLocale } from '../../utils';
import RetailHeader from 'apps/frontend/src/components/RetailShop/Header';
import CustomerSay from 'apps/frontend/src/components/RetailShop/Home/CustomerSay';
import RetailFooter from 'apps/frontend/src/components/RetailShop/Footer';
import WelcomeBanner from 'apps/frontend/src/components/RetailShop/Home/WelcomeBanner';
import FeaturedProducts from 'apps/frontend/src/components/RetailShop/Home/FeaturedProducts';
import ListingBanner from 'apps/frontend/src/components/RetailShop/Products/ListingBanner';
import ProductListing from 'apps/frontend/src/components/RetailShop/Products/ProductListing';
import ViewCart from 'apps/frontend/src/components/RetailShop/Cart';
import ThankYouPage from 'apps/frontend/src/components/RetailShop/OrderPlaced';
import { useParams } from 'next/navigation';
import { useBackDrop } from 'apps/frontend/src/context/BackDropContext';
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
