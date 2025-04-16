import { NextRequest, NextResponse } from 'next/server';
import { searchProducts, applyFilters } from "@/lib/search-utils";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const companyFilter = searchParams.get('company') || '';
  const typeFilter = searchParams.get('type') || '';
  
  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Perform search
  let results = searchProducts(query);
  
  // Apply filters if provided
  if (companyFilter || typeFilter) {
    results = applyFilters(results, companyFilter, typeFilter);
  }
  
  return NextResponse.json({ 
    results,
    meta: {
      query,
      totalResults: results.length,
      filters: {
        company: companyFilter || null,
        type: typeFilter || null
      }
    }
  });
}