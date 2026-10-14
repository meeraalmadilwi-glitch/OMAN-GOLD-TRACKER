import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { GoldHistory, GoldPrice } from '../models/gold.model';

// Shapes returned by the ASP.NET Core API (GET /api/prices and GET /api/prices/history)
interface GoldPriceDto {
  karat: number;
  pricePerGram: number;
  currency: string;
}

interface GoldHistoryDto {
  date: string;
  price18K: number;
  price21K: number;
  price22K: number;
  price24K: number;
}

// Loads every price from the backend API and converts it into the models the components use.
@Injectable({
  providedIn: 'root',
})
export class GoldService {
  private http = inject(HttpClient);

  getPrices(): Observable<GoldPrice[]> {
    return this.http.get<GoldPriceDto[]>(`${API_BASE_URL}/prices`).pipe(
      map((prices) =>
        prices
          .map((p) => ({ karat: `${p.karat}K`, price: p.pricePerGram }))
          // cards are shown from the lowest karat (18K) to the highest (24K)
          .sort((a, b) => parseInt(a.karat) - parseInt(b.karat)),
      ),
    );
  }

  getHistory(): Observable<GoldHistory[]> {
    return this.http.get<GoldHistoryDto[]>(`${API_BASE_URL}/prices/history`).pipe(
      map((days) =>
        days.map((d) => ({
          date: d.date,
          price18k: d.price18K,
          price21k: d.price21K,
          price22k: d.price22K,
          price24k: d.price24K,
        })),
      ),
    );
  }
}
