import { Button, ButtonGroup, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const CartItem = ({ item, updateItemQuantity, removeItem }) => {
  const quantity = item?.quantity || 1;
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md my-2">
      <div className="flex items-center">
        <img
          className="w-16 h-16 object-cover rounded-md"
          src={item.productImage.src}
          alt={item.productImage.src}
          data-sb-object-id={item.productImage.id}
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{item.productTitle1}</h2>
          <p className="text-sm text-gray-600 line-clamp-1">
            {item.productDescription}
          </p>
          <div className="mt-2">
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button
                onClick={() =>
                  updateItemQuantity(item.id, quantity - 1, item?.pricevalue)
                }
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button>{quantity}</Button>
              <Button
                onClick={() =>
                  updateItemQuantity(item.id, quantity + 1, item?.pricevalue)
                }
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <div className="text-right h-full flex flex-col">
        <div>
          <IconButton
            onClick={() => removeItem(item.id)}
            color="error"
            aria-label="delete"
          >
            <ClearIcon />
          </IconButton>
        </div>

        <p className="text-lg font-semibold mt-auto">
          ${(item?.price?.value?.centAmount / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
export default CartItem;
