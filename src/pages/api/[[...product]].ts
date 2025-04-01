// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getData, getDataById } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';

// Definisi tipe untuk produk
type Data = {
    status: boolean;
    statusCode: number;

    data:any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  if (req.query.product![1]) {
    const data = await getDataById('products', req.query.product![1]); // Mengambil data produk berdasarkan ID dari koleksi 'products'
    res.status(200).json({status:true, statusCode: 200, data: data});
  }
  const data = await getData('products'); // Mengambil data produk dari koleksi 'products'

  res.status(200).json({status:true, statusCode: 200, data: data});
}