import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { logoutUser } from "@/lib/store/features/auth/authThunks";

interface WorkspaceState {
  selectedSourceId: string | null;
  authorityOpen: boolean;
}

const initialState: WorkspaceState = { selectedSourceId: null, authorityOpen: false };

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    sourceSelected: (state, action: PayloadAction<string>) => {
      state.selectedSourceId = action.payload;
      state.authorityOpen = true;
    },
    sourceCleared: (state) => {
      state.selectedSourceId = null;
    },
    authorityOpenChanged: (state, action: PayloadAction<boolean>) => {
      state.authorityOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, () => initialState);
  },
});

export const { sourceSelected, sourceCleared, authorityOpenChanged } = workspaceSlice.actions;
export default workspaceSlice.reducer;

export const selectSelectedSourceId = (state: RootState) => state.workspace.selectedSourceId;
export const selectAuthorityOpen = (state: RootState) => state.workspace.authorityOpen;
