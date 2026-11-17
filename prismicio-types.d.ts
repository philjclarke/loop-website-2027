import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type BlogPostDocumentDataSlicesSlice = TextBlockSlice | ImageBlockSlice | GallerySlice | ButtonsSlice

/**
 * Content for Blog Post documents
 */
interface BlogPostDocumentData {
	/**
	 * Slice Zone field in *Blog Post*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<BlogPostDocumentDataSlicesSlice>;
	
	/**
	 * Title field in *Blog Post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Published date field in *Blog Post*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.published
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	published: prismic.DateField;
	
	/**
	 * Excerpt field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Short summary for the blog listing
	 * - **API ID Path**: blog_post.excerpt
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	excerpt: prismic.KeyTextField;
	
	/**
	 * Featured image field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.featured_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	featured_image: prismic.ImageField<never>;/**
	 * Meta Title field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: blog_post.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: blog_post.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Blog Post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BlogPostDocumentData>, "blog_post", Lang>;

type CaseStudyDocumentDataSlicesSlice = TextBlockSlice | ImageBlockSlice | NumberedListSlice | TestimonialsSlice | GallerySlice | ButtonsSlice

/**
 * Content for Case Study documents
 */
interface CaseStudyDocumentData {
	/**
	 * Slice Zone field in *Case Study*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<CaseStudyDocumentDataSlicesSlice>;
	
	/**
	 * Title field in *Case Study*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: e.g. Energising Futures
	 * - **API ID Path**: case_study.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Client field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Client or organisation name
	 * - **API ID Path**: case_study.client
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	client: prismic.KeyTextField;
	
	/**
	 * Summary field in *Case Study*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: One or two sentences shown on cards and at the top of the page
	 * - **API ID Path**: case_study.summary
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	summary: prismic.RichTextField;
	
	/**
	 * Featured image field in *Case Study*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.featured_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	featured_image: prismic.ImageField<never>;
	
	/**
	 * Scope field in *Case Study*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Project
	 * - **API ID Path**: case_study.scope
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	scope: prismic.SelectField<"Project" | "Company-wide", "filled">;
	
	/**
	 * Service: Design field in *Case Study*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: case_study.design
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	design: prismic.BooleanField;
	
	/**
	 * Service: Development field in *Case Study*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: case_study.development
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	development: prismic.BooleanField;
	
	/**
	 * Service: Learning support field in *Case Study*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: case_study.learning_support
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	learning_support: prismic.BooleanField;
	
	/**
	 * Year field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. 2025
	 * - **API ID Path**: case_study.year
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	year: prismic.KeyTextField;
	
	/**
	 * Website field in *Case Study*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.website
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	website: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Feature on homepage field in *Case Study*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: case_study.featured
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	featured: prismic.BooleanField;
	
	/**
	 * Sort order (lower numbers first) field in *Case Study*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: e.g. 10
	 * - **API ID Path**: case_study.sort_order
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	sort_order: prismic.NumberField;/**
	 * Meta Title field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: case_study.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: case_study.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Case Study*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Case Study document from Prismic
 *
 * - **API ID**: `case_study`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CaseStudyDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<CaseStudyDocumentData>, "case_study", Lang>;

type HomepageDocumentDataSlicesSlice = HeroSlice | TextBlockSlice | NumberedListSlice | ClientListSlice | CaseStudyListSlice | BlogListSlice | TestimonialsSlice | TeamSlice | ImageBlockSlice | ContactDetailsSlice | ContactFormSlice

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
	/**
	 * Slice Zone field in *Homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: homepage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: homepage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Homepage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;

type PageDocumentDataSlicesSlice = HeroSlice | TextBlockSlice | NumberedListSlice | ClientListSlice | CaseStudyListSlice | BlogListSlice | TestimonialsSlice | TeamSlice | ImageBlockSlice | ContactDetailsSlice | ContactFormSlice | GallerySlice | ButtonsSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
	/**
	 * Site name field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: loop
	 * - **API ID Path**: settings.site_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	site_name: prismic.KeyTextField;
	
	/**
	 * Navigation field in *Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.navigation
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	navigation: prismic.Repeatable<prismic.LinkField<string, string, unknown, prismic.FieldState, never>>;
	
	/**
	 * Footer CTA heading field in *Settings*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Ready to start a project?
	 * - **API ID Path**: settings.cta_heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	cta_heading: prismic.RichTextField;
	
	/**
	 * Footer CTA text field in *Settings*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.cta_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	cta_text: prismic.RichTextField;
	
	/**
	 * Footer CTA button field in *Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.cta_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Contact email field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.email
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	email: prismic.KeyTextField;
	
	/**
	 * Social links field in *Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.social_links
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	social_links: prismic.Repeatable<prismic.LinkField<string, string, unknown, prismic.FieldState, never>>;
	
	/**
	 * Legal links field in *Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.legal_links
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	legal_links: prismic.Repeatable<prismic.LinkField<string, string, unknown, prismic.FieldState, never>>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

export type AllDocumentTypes = BlogPostDocument | CaseStudyDocument | HomepageDocument | PageDocument | SettingsDocument;

/**
 * Primary content in *Blog List → Default → Primary*
 */
export interface BlogListSliceDefaultPrimary {
	/**
	 * Section label field in *Blog List → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_list.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Heading field in *Blog List → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_list.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Number of posts (empty = all) field in *Blog List → Default → Primary*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_list.default.primary.limit
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	limit: prismic.NumberField;
	
	/**
	 * Link field in *Blog List → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_list.default.primary.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for Blog List Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BlogListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<BlogListSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Blog List*
 */
type BlogListSliceVariation = BlogListSliceDefault

/**
 * Blog List Shared Slice
 *
 * - **API ID**: `blog_list`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BlogListSlice = prismic.SharedSlice<"blog_list", BlogListSliceVariation>;

/**
 * Primary content in *Buttons → Default → Primary*
 */
export interface ButtonsSliceDefaultPrimary {
	/**
	 * Buttons field in *Buttons → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: buttons.default.primary.links
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	links: prismic.Repeatable<prismic.LinkField<string, string, unknown, prismic.FieldState, "Solid" | "Outline">>;
}

/**
 * Default variation for Buttons Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ButtonsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ButtonsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Buttons*
 */
type ButtonsSliceVariation = ButtonsSliceDefault

/**
 * Buttons Shared Slice
 *
 * - **API ID**: `buttons`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ButtonsSlice = prismic.SharedSlice<"buttons", ButtonsSliceVariation>;

/**
 * Primary content in *Case Study List → Default → Primary*
 */
export interface CaseStudyListSliceDefaultPrimary {
	/**
	 * Section label field in *Case Study List → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study_list.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Heading field in *Case Study List → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study_list.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Featured case studies only field in *Case Study List → Default → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: case_study_list.default.primary.featured_only
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	featured_only: prismic.BooleanField;
	
	/**
	 * Show filters field in *Case Study List → Default → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: case_study_list.default.primary.show_filters
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	show_filters: prismic.BooleanField;
	
	/**
	 * Link field in *Case Study List → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study_list.default.primary.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for Case Study List Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CaseStudyListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<CaseStudyListSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Case Study List*
 */
type CaseStudyListSliceVariation = CaseStudyListSliceDefault

/**
 * Case Study List Shared Slice
 *
 * - **API ID**: `case_study_list`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CaseStudyListSlice = prismic.SharedSlice<"case_study_list", CaseStudyListSliceVariation>;

/**
 * Item in *Client List → Default → Primary → Clients*
 */
export interface ClientListSliceDefaultPrimaryClientsItem {
	/**
	 * Name field in *Client List → Default → Primary → Clients*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: client_list.default.primary.clients[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Logo (optional) field in *Client List → Default → Primary → Clients*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: client_list.default.primary.clients[].logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
}

/**
 * Primary content in *Client List → Default → Primary*
 */
export interface ClientListSliceDefaultPrimary {
	/**
	 * Section label field in *Client List → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: client_list.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Heading field in *Client List → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: client_list.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Clients field in *Client List → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: client_list.default.primary.clients[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	clients: prismic.GroupField<Simplify<ClientListSliceDefaultPrimaryClientsItem>>;
}

/**
 * Default variation for Client List Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ClientListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ClientListSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Client List*
 */
type ClientListSliceVariation = ClientListSliceDefault

/**
 * Client List Shared Slice
 *
 * - **API ID**: `client_list`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ClientListSlice = prismic.SharedSlice<"client_list", ClientListSliceVariation>;

/**
 * Primary content in *Contact Details → Default → Primary*
 */
export interface ContactDetailsSliceDefaultPrimary {
	/**
	 * Section label field in *Contact Details → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_details.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Heading field in *Contact Details → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_details.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *Contact Details → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_details.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Email field in *Contact Details → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_details.default.primary.email
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	email: prismic.KeyTextField;
	
	/**
	 * Phone field in *Contact Details → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_details.default.primary.phone
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	phone: prismic.KeyTextField;
	
	/**
	 * Address field in *Contact Details → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_details.default.primary.address
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	address: prismic.RichTextField;
	
	/**
	 * Other links (e.g. LinkedIn, book a call) field in *Contact Details → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_details.default.primary.links
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	links: prismic.Repeatable<prismic.LinkField<string, string, unknown, prismic.FieldState, never>>;
}

/**
 * Default variation for Contact Details Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactDetailsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ContactDetailsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Contact Details*
 */
type ContactDetailsSliceVariation = ContactDetailsSliceDefault

/**
 * Contact Details Shared Slice
 *
 * - **API ID**: `contact_details`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactDetailsSlice = prismic.SharedSlice<"contact_details", ContactDetailsSliceVariation>;

/**
 * Primary content in *Contact Form → Default → Primary*
 */
export interface ContactFormSliceDefaultPrimary {
	/**
	 * Section label field in *Contact Form → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_form.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Heading field in *Contact Form → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_form.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Intro field in *Contact Form → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_form.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Button text field in *Contact Form → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Send message
	 * - **API ID Path**: contact_form.default.primary.submit_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	submit_label: prismic.KeyTextField;
	
	/**
	 * Thank-you message field in *Contact Form → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact_form.default.primary.success_message
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	success_message: prismic.RichTextField;
}

/**
 * Default variation for Contact Form Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactFormSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ContactFormSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Contact Form*
 */
type ContactFormSliceVariation = ContactFormSliceDefault

/**
 * Contact Form Shared Slice
 *
 * - **API ID**: `contact_form`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactFormSlice = prismic.SharedSlice<"contact_form", ContactFormSliceVariation>;

/**
 * Item in *Gallery → Default → Primary → Images*
 */
export interface GallerySliceDefaultPrimaryImagesItem {
	/**
	 * Image field in *Gallery → Default → Primary → Images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.images[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Caption field in *Gallery → Default → Primary → Images*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Optional, shown when the image is enlarged
	 * - **API ID Path**: gallery.default.primary.images[].caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Primary content in *Gallery → Default → Primary*
 */
export interface GallerySliceDefaultPrimary {
	/**
	 * Columns field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: 3
	 * - **API ID Path**: gallery.default.primary.columns
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	columns: prismic.SelectField<"3" | "2", "filled">;
	
	/**
	 * Image shape field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Landscape (4:3)
	 * - **API ID Path**: gallery.default.primary.image_shape
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	image_shape: prismic.SelectField<"Landscape (4:3)" | "Square (1:1)" | "Widescreen (16:9)", "filled">;
	
	/**
	 * Images field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.images[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	images: prismic.GroupField<Simplify<GallerySliceDefaultPrimaryImagesItem>>;
}

/**
 * Default variation for Gallery Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GallerySliceDefault = prismic.SharedSliceVariation<"default", Simplify<GallerySliceDefaultPrimary>, never>;

/**
 * Slice variation for *Gallery*
 */
type GallerySliceVariation = GallerySliceDefault

/**
 * Gallery Shared Slice
 *
 * - **API ID**: `gallery`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GallerySlice = prismic.SharedSlice<"gallery", GallerySliceVariation>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Eyebrow field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. Design for education
	 * - **API ID Path**: hero.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Heading field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Button field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Primary content in *Image Block → Default → Primary*
 */
export interface ImageBlockSliceDefaultPrimary {
	/**
	 * Image field in *Image Block → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_block.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Caption field in *Image Block → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_block.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Default variation for Image Block Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageBlockSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ImageBlockSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Image Block*
 */
type ImageBlockSliceVariation = ImageBlockSliceDefault

/**
 * Image Block Shared Slice
 *
 * - **API ID**: `image_block`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageBlockSlice = prismic.SharedSlice<"image_block", ImageBlockSliceVariation>;

/**
 * Item in *Numbered List → Default → Primary → Items*
 */
export interface NumberedListSliceDefaultPrimaryItemsItem {
	/**
	 * Title field in *Numbered List → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: numbered_list.default.primary.items[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *Numbered List → Default → Primary → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: numbered_list.default.primary.items[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
}

/**
 * Primary content in *Numbered List → Default → Primary*
 */
export interface NumberedListSliceDefaultPrimary {
	/**
	 * Section label field in *Numbered List → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: numbered_list.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Heading field in *Numbered List → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: numbered_list.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Items field in *Numbered List → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: numbered_list.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<NumberedListSliceDefaultPrimaryItemsItem>>;
	
	/**
	 * Link field in *Numbered List → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: numbered_list.default.primary.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for Numbered List Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type NumberedListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<NumberedListSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Numbered List*
 */
type NumberedListSliceVariation = NumberedListSliceDefault

/**
 * Numbered List Shared Slice
 *
 * - **API ID**: `numbered_list`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type NumberedListSlice = prismic.SharedSlice<"numbered_list", NumberedListSliceVariation>;

/**
 * Item in *Team → Default → Primary → Members*
 */
export interface TeamSliceDefaultPrimaryMembersItem {
	/**
	 * Photo field in *Team → Default → Primary → Members*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.members[].photo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
	
	/**
	 * Name field in *Team → Default → Primary → Members*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.members[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Role field in *Team → Default → Primary → Members*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.members[].role
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	role: prismic.KeyTextField;
	
	/**
	 * Bio field in *Team → Default → Primary → Members*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.members[].bio
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	bio: prismic.RichTextField;
}

/**
 * Primary content in *Team → Default → Primary*
 */
export interface TeamSliceDefaultPrimary {
	/**
	 * Section label field in *Team → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Heading field in *Team → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Members field in *Team → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.members[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	members: prismic.GroupField<Simplify<TeamSliceDefaultPrimaryMembersItem>>;
}

/**
 * Default variation for Team Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TeamSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TeamSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Team*
 */
type TeamSliceVariation = TeamSliceDefault

/**
 * Team Shared Slice
 *
 * - **API ID**: `team`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TeamSlice = prismic.SharedSlice<"team", TeamSliceVariation>;

/**
 * Item in *Testimonials → Default → Primary → Testimonials*
 */
export interface TestimonialsSliceDefaultPrimaryItemsItem {
	/**
	 * Quote field in *Testimonials → Default → Primary → Testimonials*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.items[].quote
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	quote: prismic.RichTextField;
	
	/**
	 * Name field in *Testimonials → Default → Primary → Testimonials*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.items[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Role and organisation field in *Testimonials → Default → Primary → Testimonials*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.items[].role
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	role: prismic.KeyTextField;
}

/**
 * Primary content in *Testimonials → Default → Primary*
 */
export interface TestimonialsSliceDefaultPrimary {
	/**
	 * Section label field in *Testimonials → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Testimonials field in *Testimonials → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: testimonials.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<TestimonialsSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for Testimonials Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TestimonialsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TestimonialsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Testimonials*
 */
type TestimonialsSliceVariation = TestimonialsSliceDefault

/**
 * Testimonials Shared Slice
 *
 * - **API ID**: `testimonials`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TestimonialsSlice = prismic.SharedSlice<"testimonials", TestimonialsSliceVariation>;

/**
 * Primary content in *Text Block → Default → Primary*
 */
export interface TextBlockSliceDefaultPrimary {
	/**
	 * Section label field in *Text Block → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_block.default.primary.label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Heading field in *Text Block → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_block.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *Text Block → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_block.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Link field in *Text Block → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_block.default.primary.link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for Text Block Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextBlockSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TextBlockSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Text Block*
 */
type TextBlockSliceVariation = TextBlockSliceDefault

/**
 * Text Block Shared Slice
 *
 * - **API ID**: `text_block`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextBlockSlice = prismic.SharedSlice<"text_block", TextBlockSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			BlogPostDocument,
			BlogPostDocumentData,
			BlogPostDocumentDataSlicesSlice,
			CaseStudyDocument,
			CaseStudyDocumentData,
			CaseStudyDocumentDataSlicesSlice,
			HomepageDocument,
			HomepageDocumentData,
			HomepageDocumentDataSlicesSlice,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			AllDocumentTypes,
			BlogListSlice,
			BlogListSliceDefaultPrimary,
			BlogListSliceVariation,
			BlogListSliceDefault,
			ButtonsSlice,
			ButtonsSliceDefaultPrimary,
			ButtonsSliceVariation,
			ButtonsSliceDefault,
			CaseStudyListSlice,
			CaseStudyListSliceDefaultPrimary,
			CaseStudyListSliceVariation,
			CaseStudyListSliceDefault,
			ClientListSlice,
			ClientListSliceDefaultPrimaryClientsItem,
			ClientListSliceDefaultPrimary,
			ClientListSliceVariation,
			ClientListSliceDefault,
			ContactDetailsSlice,
			ContactDetailsSliceDefaultPrimary,
			ContactDetailsSliceVariation,
			ContactDetailsSliceDefault,
			ContactFormSlice,
			ContactFormSliceDefaultPrimary,
			ContactFormSliceVariation,
			ContactFormSliceDefault,
			GallerySlice,
			GallerySliceDefaultPrimaryImagesItem,
			GallerySliceDefaultPrimary,
			GallerySliceVariation,
			GallerySliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			ImageBlockSlice,
			ImageBlockSliceDefaultPrimary,
			ImageBlockSliceVariation,
			ImageBlockSliceDefault,
			NumberedListSlice,
			NumberedListSliceDefaultPrimaryItemsItem,
			NumberedListSliceDefaultPrimary,
			NumberedListSliceVariation,
			NumberedListSliceDefault,
			TeamSlice,
			TeamSliceDefaultPrimaryMembersItem,
			TeamSliceDefaultPrimary,
			TeamSliceVariation,
			TeamSliceDefault,
			TestimonialsSlice,
			TestimonialsSliceDefaultPrimaryItemsItem,
			TestimonialsSliceDefaultPrimary,
			TestimonialsSliceVariation,
			TestimonialsSliceDefault,
			TextBlockSlice,
			TextBlockSliceDefaultPrimary,
			TextBlockSliceVariation,
			TextBlockSliceDefault
		}
	}
}