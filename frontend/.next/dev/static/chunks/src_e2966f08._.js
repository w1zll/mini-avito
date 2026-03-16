(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/entities/ad/api/getAds.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAds",
    ()=>getAds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/client.ts [app-client] (ecmascript)");
;
const getAds = async (params)=>{
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/ads', {
        params
    });
    return data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/entities/ad/api/useInfiniteAds.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInfiniteAds",
    ()=>useInfiniteAds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$entities$2f$ad$2f$api$2f$getAds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/entities/ad/api/getAds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const useInfiniteAds = (filters)=>{
    _s();
    const authLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "useInfiniteAds.useSelector[authLoading]": (state)=>state.auth.loading
    }["useInfiniteAds.useSelector[authLoading]"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"])({
        queryKey: [
            'ads',
            filters
        ],
        queryFn: {
            "useInfiniteAds.useInfiniteQuery": ({ pageParam = 1 })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$entities$2f$ad$2f$api$2f$getAds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAds"])({
                    ...filters,
                    page: pageParam
                })
        }["useInfiniteAds.useInfiniteQuery"],
        enabled: !authLoading,
        initialPageParam: 1,
        getNextPageParam: {
            "useInfiniteAds.useInfiniteQuery": (lastPage)=>{
                const { page, limit, total } = lastPage;
                const maxPage = Math.ceil(total / limit);
                return page < maxPage ? page + 1 : undefined;
            }
        }["useInfiniteAds.useInfiniteQuery"]
    });
};
_s(useInfiniteAds, "J+kGnWZPIvG8/IeHoww3zmiOZSw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/favorites/api/toggleFavorite.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addFavorite",
    ()=>addFavorite,
    "removeFavorite",
    ()=>removeFavorite
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/client.ts [app-client] (ecmascript)");
;
const addFavorite = (adId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/favorites/${adId}`);
const removeFavorite = (adId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete(`/favorites/${adId}`);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/favorites/model/useToggleFavorite.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useToggleFavorite",
    ()=>useToggleFavorite
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$favorites$2f$api$2f$toggleFavorite$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/favorites/api/toggleFavorite.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useToggleFavorite = ()=>{
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useToggleFavorite.useMutation": async ({ adId, isFavorite })=>{
                if (isFavorite) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$favorites$2f$api$2f$toggleFavorite$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeFavorite"])(adId);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$favorites$2f$api$2f$toggleFavorite$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addFavorite"])(adId);
            }
        }["useToggleFavorite.useMutation"],
        onMutate: {
            "useToggleFavorite.useMutation": async ({ adId })=>{
                await queryClient.cancelQueries({
                    queryKey: [
                        'ads'
                    ]
                });
                const prev = queryClient.getQueryData([
                    'ads'
                ]);
                queryClient.setQueryData([
                    'ads'
                ], {
                    "useToggleFavorite.useMutation": (old)=>{
                        if (!old) return old;
                        return {
                            ...old,
                            pages: old.pages.map({
                                "useToggleFavorite.useMutation": (page)=>({
                                        ...page,
                                        items: page.items.map({
                                            "useToggleFavorite.useMutation": (ad)=>ad.id === adId ? {
                                                    ...ad,
                                                    favorite: !ad.favorite
                                                } : ad
                                        }["useToggleFavorite.useMutation"])
                                    })
                            }["useToggleFavorite.useMutation"])
                        };
                    }
                }["useToggleFavorite.useMutation"]);
                return {
                    prev
                };
            }
        }["useToggleFavorite.useMutation"],
        onError: {
            "useToggleFavorite.useMutation": (_err, _vars, context)=>{
                queryClient.setQueryData([
                    'ads'
                ], context?.prev);
            }
        }["useToggleFavorite.useMutation"],
        onSettled: {
            "useToggleFavorite.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'ads'
                    ]
                });
            }
        }["useToggleFavorite.useMutation"]
    });
};
_s(useToggleFavorite, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/entities/ad/ui/AdsList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdsList",
    ()=>AdsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$entities$2f$ad$2f$api$2f$useInfiniteAds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/entities/ad/api/useInfiniteAds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-virtual/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$favorites$2f$model$2f$useToggleFavorite$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/favorites/model/useToggleFavorite.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const AdsList = ()=>{
    _s();
    const parentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const favorites = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "AdsList.useSelector[favorites]": (state)=>state.favorites.ids
    }["AdsList.useSelector[favorites]"]);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$entities$2f$ad$2f$api$2f$useInfiniteAds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteAds"])({
        search,
        limit: 10
    });
    const ads = data?.pages.flatMap((page)=>page.items) ?? [];
    const rowVirtualizer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useVirtualizer"])({
        count: ads.length,
        getScrollElement: {
            "AdsList.useVirtualizer[rowVirtualizer]": ()=>parentRef.current
        }["AdsList.useVirtualizer[rowVirtualizer]"],
        estimateSize: {
            "AdsList.useVirtualizer[rowVirtualizer]": ()=>150
        }["AdsList.useVirtualizer[rowVirtualizer]"],
        overscan: 5
    });
    const handleScroll = ()=>{
        if (!parentRef.current || !hasNextPage) return;
        const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 200 && !isFetchingNextPage) {
            fetchNextPage();
        }
    };
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const handlePrefetch = (id)=>{
        queryClient.prefetchQuery({
            queryKey: [
                'ad',
                id
            ],
            queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(`/ads/${id}`).then((res)=>res.data)
        });
    };
    const toggleFavoriteQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$favorites$2f$model$2f$useToggleFavorite$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleFavorite"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: "Поиск",
                value: search,
                onChange: (e)=>setSearch(e.target.value),
                style: {
                    marginBottom: '10px',
                    padding: '5px',
                    border: '1px solid #ccc'
                }
            }, void 0, false, {
                fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: parentRef,
                onScroll: handleScroll,
                style: {
                    height: '80vh',
                    overflow: 'auto'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            position: 'relative'
                        },
                        children: rowVirtualizer.getVirtualItems().map((virtualRow)=>{
                            const ad = ads[virtualRow.index];
                            if (!ad) return null;
                            // console.log(ad.favorite);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/ads/${ad.id}`,
                                onMouseEnter: ()=>handlePrefetch(ad.id),
                                style: {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    transform: `translateY(${virtualRow.start}px)`,
                                    borderBottom: '1px solid #ccc',
                                    padding: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: ad.id
                                            }, void 0, false, {
                                                fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                                                lineNumber: 98,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: ad.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                                                lineNumber: 99,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "$",
                                                    ad.price
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: ad.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                                                lineNumber: 101,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: (e)=>{
                                            // e.stopPropagation();
                                            e.preventDefault();
                                            toggleFavoriteQuery.mutate({
                                                adId: ad.id,
                                                isFavorite: ad.favorite
                                            });
                                        // dispatch(toggleFavorite(ad.id));
                                        },
                                        children: ad?.favorite ? '❤️' : '🤍'
                                    }, void 0, false, {
                                        fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, ad.id, true, {
                                fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isFetchingNextPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: 'red',
                            textAlign: 'center'
                        },
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/entities/ad/ui/AdsList.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdsList, "c8hyyT2/ygj74vdYoRz16/EUVjQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$entities$2f$ad$2f$api$2f$useInfiniteAds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteAds"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useVirtualizer"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$favorites$2f$model$2f$useToggleFavorite$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleFavorite"]
    ];
});
_c = AdsList;
var _c;
__turbopack_context__.k.register(_c, "AdsList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_e2966f08._.js.map