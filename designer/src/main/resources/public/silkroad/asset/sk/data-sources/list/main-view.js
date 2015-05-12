define(["template","dialog","data-sources/list/main-model","data-sources/list/main-template","data-sources/list/set-name-template","data-sources/list/group-item-template"],function(a,b,c,d,e,f){return Backbone.View.extend({events:{"click .j-add-data-sources":"addDataSources","click .j-delete-data-sources":"deleteDataSources","click .j-edit-data-sources":"editDataSources","click .j-add-data-sources-group":"addDataSourcesGroup","click .j-edit-data-sources-group":"editDataSourcesGroup","click .j-del-data-sources-group":"delDataSourcesGroup","click .j-input-data-sources":"changeDataSourceActive"},initialize:function(){var a=this;a.model=new c,this.listenTo(this.model,"change:dataSourcesList",function(b,c){a.$el.html(d.render({dataSourcesGroupList:c}))}),this.model.loadDataSourcesList(),window.dataInsight.main=this},addDataSources:function(){window.dataInsight.main.destroy(),require(["data-sources/create-view"],function(a){new a({el:$(".j-main"),isAdd:!0})})},editDataSources:function(a){var b=this.getLineId(a),c=this.getGroupId(a);window.dataInsight.main.destroy(),require(["data-sources/create-view"],function(a){new a({el:$(".j-main"),id:b,groupId:c,isAdd:!1})})},deleteDataSources:function(a){var c=this,d=this.getLineId(a),e=this.getGroupId(a);b.confirm("是否确定删除当前数据源",function(){c.model.deleteDataSources(e,d)})},addDataSourcesGroup:function(){var a=this;b.showDialog({title:"添加数据源组",content:e.render({text:"数据源名称"}),dialog:{width:300,height:249,open:function(){var a=$(this);a.find(".j-data-sources-group-name").focus(function(){a.find(".j-validation").hide()})},buttons:[{text:"提交",click:function(){var b=$(this),c=b.find(".j-data-sources-group-name").val();return""==c?(b.find(".j-validation").html("名称不能为空").show(),void 0):(a.model.addDsGroup(c,function(a){b.dialog("close"),$(".j-data-sources-tbody").append(f.render({id:a,name:c}))}),void 0)}},{text:"取消",click:function(){$(this).dialog("close")}}]}})},editDataSourcesGroup:function(a){var c=this,d=$(a.target).parent().parent(),f=d.find("label"),g=f.text(),h=d.attr("data-id");b.showDialog({title:"编辑数据源组名称",content:e.render({text:"数据源名称",name:g}),dialog:{width:300,height:249,open:function(){var a=$(this);a.find(".j-data-sources-group-name").focus(function(){a.find(".j-validation").hide()})},buttons:[{text:"提交",click:function(){var a=$(this),b=a.find(".j-data-sources-group-name").val();return""==b?(a.find(".j-validation").html("名称不能为空").show(),void 0):(c.model.editDsGroup(h,b,function(){a.dialog("close"),f.text(b)}),void 0)}},{text:"取消",click:function(){$(this).dialog("close")}}]}})},delDataSourcesGroup:function(a){var c=this,d=$(a.target).parent().parent(),e=d.attr("data-id");b.confirm("是否确定删除当前数据源组",function(){c.model.delDsGroup(e,function(){d.remove(),$("input[name="+e+"]").each(function(){$(this).parents(".j-root-line").remove()})})})},getLineId:function(a){return $(a.target).parents(".j-root-line").attr("data-id")},getGroupId:function(a){return $(a.target).parents(".j-root-line").find("input").attr("name")},changeDataSourceActive:function(a){var b=$(a.target).attr("name"),c=$(a.target).attr("id").split("-")[1];this.model.changeDataSourceActive(b,c)},destroy:function(){this.model.clear({silent:!0}),this.stopListening(),$(this.el).unbind().empty()}})});