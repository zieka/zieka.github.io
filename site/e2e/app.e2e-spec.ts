import { KyleScullyPage } from './app.po';

describe('kyle-scully App', function() {
  let page: KyleScullyPage;

  beforeEach(() => {
    page = new KyleScullyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
