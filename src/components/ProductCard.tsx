import { motion } from 'framer-motion'
import { ShoppingBag, MapPin, Check } from 'lucide-react'

interface ProductCardProps {
  id: string
  title: string
  price: number
  image?: string
  stock: number
  storeId?: string
  onReserve?: (productId: string) => void
}

function ProductCard({
  id,
  title,
  price,
  image,
  stock,
  storeId,
  onReserve,
}: ProductCardProps) {
  const inStock = stock > 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-teal/10 to-navy/10 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <ShoppingBag className="w-16 h-16 text-teal/30" />
        )}
        
        {/* Stock Badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
            inStock
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              inStock ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span>{inStock ? 'In Stock' : 'Out of Stock'}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-semibold text-navy mb-1 line-clamp-2">{title}</h3>
        <div className="flex items-baseline space-x-2 mb-3">
          <span className="text-2xl font-bold text-teal">₹{price.toLocaleString()}</span>
          {price > 1000 && (
            <span className="text-sm text-gray-500 line-through">
              ₹{Math.round(price * 1.2).toLocaleString()}
            </span>
          )}
        </div>

        {/* Store Info */}
        {storeId && (
          <div className="flex items-center space-x-1 text-xs text-gray-600 mb-3">
            <MapPin className="w-3 h-3" />
            <span>Available at {storeId}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => onReserve && onReserve(id)}
          disabled={!inStock}
          className={`w-full py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
            inStock
              ? 'bg-teal text-white hover:bg-teal-dark'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{inStock ? 'Reserve Now' : 'Sold Out'}</span>
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
