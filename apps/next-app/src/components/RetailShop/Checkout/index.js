import { useBackDrop } from 'apps/next-app/src/context/BackDropContext';
import { Button } from '@mui/material';
import { currency } from 'apps/next-app/src/utils/constant';
import getStripe from 'apps/next-app/src/utils/stripe';

const Checkout = (props) => {
  const { showBackDrop, hideBackDrop } = useBackDrop();

  const handleSubmit = async () => {
    showBackDrop();
    const line_items = props.items.map((item) => {
      const { quantity, pricevalue, name, description, image } = item;
      return {
        quantity,
        price_data: {
          currency,
          unit_amount: Math.round(pricevalue * 100),
          product_data: {
            name,
            description,
            images: [image],
          },
        },
      };
    });
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(line_items),
    });

    const checkoutSession = await res.json();
    hideBackDrop();
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    console.warn(error.message);
  };

  return (
    <Button
      disabled={props.hasOutOfStock}
      onClick={handleSubmit}
      variant={props.theme || 'contained'}
      color="success"
    >
      {props.label || 'Checkout'}
    </Button>
  );
};

export default Checkout;
