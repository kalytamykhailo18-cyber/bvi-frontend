/**
 * Redux Toolkit Slice for Dashboard State
 * Manages filters, data fetching, and UI state
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

// Async thunks for API calls
export const fetchOverviewStats = createAsyncThunk(
  'dashboard/fetchOverviewStats',
  async () => {
    const response = await axios.get(`${API_BASE}/stats/overview`);
    return response.data;
  }
);

export const fetchPosts = createAsyncThunk(
  'dashboard/fetchPosts',
  async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_BASE}/posts?${params}`);
    return response.data;
  }
);

export const fetchSentimentDistribution = createAsyncThunk(
  'dashboard/fetchSentimentDistribution',
  async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_BASE}/sentiment/distribution?${params}`);
    return response.data;
  }
);

export const fetchTopicDistribution = createAsyncThunk(
  'dashboard/fetchTopicDistribution',
  async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_BASE}/topics/distribution?${params}`);
    return response.data;
  }
);

export const fetchInfluencers = createAsyncThunk(
  'dashboard/fetchInfluencers',
  async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_BASE}/influencers?${params}`);
    return response.data;
  }
);

export const fetchViralitySignals = createAsyncThunk(
  'dashboard/fetchViralitySignals',
  async () => {
    const response = await axios.get(`${API_BASE}/virality/early-signals`);
    return response.data;
  }
);

export const fetchTimeline = createAsyncThunk(
  'dashboard/fetchTimeline',
  async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_BASE}/trends/timeline?${params}`);
    return response.data;
  }
);

export const fetchKeywords = createAsyncThunk(
  'dashboard/fetchKeywords',
  async (filters) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_BASE}/keywords/frequency?${params}`);
    return response.data;
  }
);

export const fetchFilterOptions = createAsyncThunk(
  'dashboard/fetchFilterOptions',
  async () => {
    const response = await axios.get(`${API_BASE}/filters/options`);
    return response.data;
  }
);

const initialState = {
  // Filters
  filters: {
    keyword: '',
    sentiment: '',
    startDate: '',
    endDate: '',
    platform: '',
    sourceId: '',
    topic: '',
  },

  // Data
  overviewStats: null,
  posts: [],
  postsTotal: 0,
  sentimentDistribution: [],
  topicDistribution: [],
  influencers: [],
  viralitySignals: [],
  timeline: [],
  keywords: [],
  filterOptions: {
    sources: [],
    platforms: [],
    sentiments: [],
    topics: []
  },

  // UI State
  loading: false,
  error: null,
  currentPage: 'overview',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Overview stats
    builder
      .addCase(fetchOverviewStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOverviewStats.fulfilled, (state, action) => {
        state.loading = false;
        state.overviewStats = action.payload;
      })
      .addCase(fetchOverviewStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Posts
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.postsTotal = action.payload.total;
      });

    // Sentiment distribution
    builder
      .addCase(fetchSentimentDistribution.fulfilled, (state, action) => {
        state.sentimentDistribution = action.payload;
      });

    // Topic distribution
    builder
      .addCase(fetchTopicDistribution.fulfilled, (state, action) => {
        state.topicDistribution = action.payload;
      });

    // Influencers
    builder
      .addCase(fetchInfluencers.fulfilled, (state, action) => {
        state.influencers = action.payload;
      });

    // Virality signals
    builder
      .addCase(fetchViralitySignals.fulfilled, (state, action) => {
        state.viralitySignals = action.payload;
      });

    // Timeline
    builder
      .addCase(fetchTimeline.fulfilled, (state, action) => {
        state.timeline = action.payload;
      });

    // Keywords
    builder
      .addCase(fetchKeywords.fulfilled, (state, action) => {
        state.keywords = action.payload;
      });

    // Filter options
    builder
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.filterOptions = action.payload;
      });
  },
});

export const { setFilter, resetFilters, setCurrentPage } = dashboardSlice.actions;
export default dashboardSlice.reducer;
