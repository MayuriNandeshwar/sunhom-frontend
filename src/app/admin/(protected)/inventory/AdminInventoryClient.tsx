"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/admin/shared/Breadcrumbs";
import PageHeader from "@/components/admin/shared/PageHeader";
import Pagination from "@/components/admin/shared/Pagination";
import InventorySummaryCards from "@/components/admin/inventory/InventorySummaryCards";
import InventoryTable from "@/components/admin/inventory/InventoryTable";
import MobileInventoryList from "@/components/admin/inventory/MobileInventoryList";
import UpdateStockModal from "@/components/admin/inventory/UpdateStockModal";
import {
  AdminInventoryItem,
  AdminInventorySummary,
  AdminInventoryUpdatePayload,
  StockStatus,
  adminInventoryService,
} from "@/services/admin.inventory.service";
import { Search, RotateCw, Filter, ArrowUpDown, CheckCircle, PackageOpen } from "lucide-react";

const PAGE_SIZE = 10;

interface Props {
  initialItems: AdminInventoryItem[];
  initialSummary?: AdminInventorySummary;
}

export default function AdminInventoryClient({
  initialItems,
  initialSummary,
}: Props) {
  const [items, setItems] = useState<AdminInventoryItem[]>(initialItems || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StockStatus | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"STOCK_ASC" | "STOCK_DESC" | "NAME" | "UPDATED">("STOCK_ASC");
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit modal state
  const [selectedItem, setSelectedItem] = useState<AdminInventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute live summary from items
  const summary: AdminInventorySummary = useMemo(() => {
    const totalVariants = items.length;
    const totalStockUnits = items.reduce((acc, i) => acc + (i.availableQuantity || 0), 0);
    const inStockCount = items.filter((i) => i.stockStatus === "IN_STOCK").length;
    const lowStockCount = items.filter((i) => i.stockStatus === "LOW_STOCK").length;
    const outOfStockCount = items.filter((i) => i.stockStatus === "OUT_OF_STOCK").length;

    return {
      totalVariants,
      totalStockUnits,
      inStockCount,
      lowStockCount,
      outOfStockCount,
    };
  }, [items]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Status filter
    if (statusFilter !== "ALL") {
      result = result.filter((i) => i.stockStatus === statusFilter);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (i) =>
          i.productName.toLowerCase().includes(q) ||
          i.sku.toLowerCase().includes(q) ||
          (i.variantTitle && i.variantTitle.toLowerCase().includes(q)) ||
          (i.fragrance && i.fragrance.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "STOCK_ASC":
          return a.availableQuantity - b.availableQuantity;
        case "STOCK_DESC":
          return b.availableQuantity - a.availableQuantity;
        case "NAME":
          return a.productName.localeCompare(b.productName);
        case "UPDATED":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [items, statusFilter, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + PAGE_SIZE);

  // Refresh live from server
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await adminInventoryService.getAll();
      setItems(data);
      showToast("Inventory refreshed with latest real-time stock.");
    } catch (err) {
      console.error("Refresh error:", err);
      showToast("Failed to refresh inventory. Please check server.");
    } finally {
      setRefreshing(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenEdit = (item: AdminInventoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSaveStock = async (
    variantId: string,
    payload: AdminInventoryUpdatePayload
  ) => {
    const updated = await adminInventoryService.updateStock(variantId, payload);
    setItems((prev) =>
      prev.map((item) => (item.variantId === variantId ? updated : item))
    );
    showToast(`Stock updated for ${updated.productName} (${updated.sku})!`);
  };

  return (
    <section className="p-3 md:p-6 pb-32">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* BREADCRUMBS */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin/dashboard" },
            { label: "Inventory" },
          ]}
        />

        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Inventory Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Live tracking, variant stock adjustment & low-stock alerts
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm shadow-sm transition active:scale-95 disabled:opacity-50"
          >
            <RotateCw size={16} className={refreshing ? "animate-spin text-amber-600" : ""} />
            <span>{refreshing ? "Syncing..." : "Refresh Live Stock"}</span>
          </button>
        </div>

        {/* TOAST FEEDBACK */}
        {toastMessage && (
          <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl shadow-sm animate-fadeIn">
            <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* SUMMARY METRIC CARDS */}
        <InventorySummaryCards
          summary={summary}
          activeFilter={statusFilter}
          onSelectFilter={(filter) => {
            setStatusFilter(filter);
            setPage(1);
          }}
        />

        {/* SEARCH, FILTERS & SORT BAR */}
        <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* SEARCH INPUT */}
          <div className="relative flex-1 min-w-[240px]">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by product name, SKU, fragrance..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
            />
          </div>

          {/* FILTER & SORT CONTROLS */}
          <div className="flex flex-wrap items-center gap-2">
            {/* STATUS FILTER PILLS */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              {(["ALL", "IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"] as const).map((filter) => {
                const isSelected = statusFilter === filter;
                const labels: Record<string, string> = {
                  ALL: "All",
                  IN_STOCK: "In Stock",
                  LOW_STOCK: "Low Stock",
                  OUT_OF_STOCK: "Out of Stock",
                };

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => {
                      setStatusFilter(filter);
                      setPage(1);
                    }}
                    className={`
                      px-3 py-1.5 rounded-lg transition
                      ${isSelected ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}
                    `}
                  >
                    {labels[filter]}
                  </button>
                );
              })}
            </div>

            {/* SORT DROPDOWN */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700">
              <ArrowUpDown size={14} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium focus:outline-none text-xs text-gray-700 cursor-pointer"
              >
                <option value="STOCK_ASC">Stock: Low to High</option>
                <option value="STOCK_DESC">Stock: High to Low</option>
                <option value="NAME">Product Name</option>
                <option value="UPDATED">Recently Updated</option>
              </select>
            </div>
          </div>
        </div>

        {/* INVENTORY CONTENT */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <PackageOpen size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No inventory items found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              {searchQuery || statusFilter !== "ALL"
                ? "No products or variants matched your current search and filters."
                : "No inventory records are available yet. Add products to generate inventory."}
            </p>
            {(searchQuery || statusFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("ALL");
                }}
                className="mt-4 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 px-4 py-2 rounded-xl transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* MOBILE LIST VIEW */}
            <div className="md:hidden">
              <MobileInventoryList items={paginatedItems} onEdit={handleOpenEdit} />
            </div>

            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block">
              <InventoryTable items={paginatedItems} onEdit={handleOpenEdit} />
            </div>

            {/* PAGINATION */}
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
              totalItems={filteredItems.length}
              pageSize={PAGE_SIZE}
            />
          </>
        )}

        {/* UPDATE STOCK MODAL */}
        <UpdateStockModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveStock}
        />
      </div>
    </section>
  );
}
