---
title: "Fuzzy search across 1–2 million auction records"
summary: "How fuzzy matching and advanced filters supported auction discovery in DEN Auction."
date: "2026-11-14"
draft: false
---

On [DEN Auction](/projects/den-auction), I built Elasticsearch search with fuzzy matching and advanced filtering across approximately 1–2 million auction records. Query response times dropped from over three seconds to under one second.

## Matching text and narrowing results

Fuzzy matching gives users a chance to find a listing even when they mistype part of a query. The trade-off is that a broader match can admit less relevant results and require more work. Filters serve a different purpose: they narrow results according to the criteria a user selects. Keeping those concerns distinct lets a search be forgiving about text while respecting the user’s explicit constraints.

## What the timing tells us

The before-and-after timings describe the improvement reported for the project. The record count describes the scale of the searchable collection. Neither figure establishes a latency percentile, and the timing should be read in that context.
