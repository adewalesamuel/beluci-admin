import { Route, Routes } from "react-router-dom";
import { Layouts } from "../layouts";
import { Views } from "../views";

export function MainRoutes() {
    return (
        <Layouts.MainLayout>
            <Routes>
                <Route path='' element={<Views.DashboardView />} />
                <Route path='pages' element={<Views.PageListView />} />
                <Route path='pages/create' element={<Views.PageCreateView />} />
                <Route path='pages/:id/edit' element={<Views.PageEditView />} />
                <Route path='events' element={<Views.EventListView />} />
                <Route path='events/create' element={<Views.EventCreateView />} />
                <Route path='events/:id/edit/*' element={<Views.EventEditView />} />
                <Route path='admins' element={<Views.AdminListView />} />
                <Route path='admins/create' element={<Views.AdminCreateView />} />
                <Route path='admins/:id/edit/*' element={<Views.AdminEditView />} />
                <Route path='menus' element={<Views.MenuListView />} />
                <Route path='menus/create' element={<Views.MenuCreateView />} />
                <Route path='menus/:id/edit' element={<Views.MenuEditView />} />
                <Route path='menu-items' element={<Views.MenuItemListView />} />
                <Route path='menu-items/create' element={<Views.MenuItemCreateView />} />
                <Route path='menu-items/:id/edit' element={<Views.MenuItemEditView />} />
                <Route path='gallerys' element={<Views.GalleryListView />} />
                <Route path='gallerys/create' element={<Views.GalleryCreateView />} />
                <Route path='gallerys/:id/edit' element={<Views.GalleryEditView />} />
                <Route path='posts' element={<Views.PostListView />} />
                <Route path='posts/create' element={<Views.PostCreateView />} />
                <Route path='posts/:id/edit' element={<Views.PostEditView />} />
                <Route path='members' element={<Views.MemberListView />} />
                <Route path='members-trashed' element={<Views.MemberTrashedListView />} />
                <Route path='members/create' element={<Views.MemberCreateView />} />
                <Route path='members/:id/edit' element={<Views.MemberEditView />} />
                <Route path='forums' element={<Views.ForumListView />} />
                <Route path='forums/create' element={<Views.ForumCreateView />} />
                <Route path='forums/:id/edit' element={<Views.ForumEditView />} />
                <Route path='forum-categorys' element={<Views.ForumCategoryListView />} />
                <Route path='forum-categorys/create' element={<Views.ForumCategoryCreateView />} />
                <Route path='forum-categorys/:id/edit' element={<Views.ForumCategoryEditView />} />
                <Route path='forums/:id/messages' element={<Views.MessageListView />} />
                <Route path='forums/:id/messages/create' element={<Views.MessageCreateView />} />
            </Routes>
        </Layouts.MainLayout>
    )
}