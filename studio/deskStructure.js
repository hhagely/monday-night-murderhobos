/* eslint-disable import/no-unresolved */
import S from '@sanity/desk-tool/structure-builder';
// import MdBusiness from 'react-icons/lib/md/business';
import MdSettings from 'react-icons/lib/md/settings';
import FaFileO from 'react-icons/lib/fa/file-o';

const hiddenTypes = [
  'category',
  'companyInfo',
  'page',
  'person',
  'post',
  'project',
  'siteSettings',
  'campaign',
  'session',
  'partyMember',
];

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Campaigns')
        .schemaType('campaign')
        .child(S.documentTypeList('campaign')),
      S.listItem()
        .title('Sessions')
        .schemaType('session')
        .child(S.documentTypeList('session')),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('About')
                .child(
                  S.editor()
                    .id('aboutPage')
                    .schemaType('page')
                    .documentId('about')
                )
                .icon(FaFileO),
            ])
        ),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Party Members')
        .schemaType('partyMember')
        .child(S.documentTypeList('partyMember').title('Party Member')),
    ]);
