import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Image from 'components/Image';
import Link from 'components/Link';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectBackground, ProjectHeader, ProjectSection,
  ProjectSectionContent, ProjectImage, ProjectSectionHeading, ProjectSectionText,
  ProjectSectionColumns, ProjectTextRow
} from 'components/ProjectLayout';
import SegmentedControl, { SegmentedControlOption } from 'components/SegmentedControl';
import { useTheme } from 'components/ThemeProvider';
import { useAppContext, useScrollRestore } from 'hooks';
import { media } from 'utils/style';
import prerender from 'utils/prerender';
import modernBackground from 'assets/modern-background.jpg';
import modernBackgroundLarge from 'assets/modern-background-large.jpg';
import modernBackgroundPlaceholder from 'assets/modern-background-placeholder.jpg';
import modern from 'assets/modern.jpg';
import modernLarge from 'assets/modern-large.jpg';
import modernPlaceholder from 'assets/modern-placeholder.jpg';
import modernBranding from 'assets/modern-branding.png';
import modernBrandingLarge from 'assets/modern-branding-large.png';
import modernBrandingPlaceholder from 'assets/modern-branding-placeholder.png';
import modernComponentsDark from 'assets/modern-components-dark.png';
import modernComponentsDarkLarge from 'assets/modern-components-dark-large.png';
import modernComponentsDarkPlaceholder from 'assets/modern-components-dark-placeholder.png';
import modernComponentsLight from 'assets/modern-components-light.png';
import modernComponentsLightLarge from 'assets/modern-components-light-large.png';
import modernComponentsLightPlaceholder from 'assets/modern-components-light-placeholder.png';
import modernDesignSystemDark from 'assets/modern-design-system-dark.jpg';
import modernDesignSystemDarkLarge from 'assets/modern-design-system-dark-large.jpg';
import modernDesignSystemDarkPlaceholder from 'assets/modern-design-system-dark-placeholder.jpg';
import modernDesignSystemLight from 'assets/modern-design-system-light.jpg';
import modernDesignSystemLightLarge from 'assets/modern-design-system-light-large.jpg';
import modernDesignSystemLightPlaceholder from 'assets/modern-design-system-light-placeholder.jpg';
import modernLanding from 'assets/modern-landing.jpg';
import modernLandingLarge from 'assets/modern-landing-large.jpg';
import modernLandingPlaceholder from 'assets/modern-landing-placeholder.jpg';

const title = 'Project Modern';
const description = 'Building a community that puts players and game health first, not profits.';
const roles = [
  'Visual Identity',
  'UX and UI Design',
  'Full-stack Development',
];

function ProjectModern() {
  const { themeId } = useTheme();
  const { dispatch } = useAppContext();
  useScrollRestore();

  const isDark = themeId === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    dispatch({ type: 'setTheme', value: themes[index] });
  };

  return (
    <Fragment>
      <Helmet>
        <title>{`Projects | ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${modernBackground} 1080w, ${modernBackgroundLarge} 2160w`}
          placeholder={modernBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://projectmodern.gg"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              raised
              srcSet={`${modern} 1280w, ${modernLarge} 2560w`}
              placeholder={modernPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Landing screen of the Project Modern website."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectTextRow>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
              <ProjectSectionText>
                Project Modern is a splinter community from a gamemode based from the
                card game: Magic, the Gathering in protest of recent conflict of interest
                in game management.
              </ProjectSectionText>
              <ProjectSectionText>
                We represented the modern or new feel behind the mission of Project Modern
                with custom typography with a plus for new, accompanied with fresh colors
                and a crisp typeface.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${modernBranding} 400w, ${modernBrandingLarge} 898w`}
              placeholder={modernBrandingPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="The Project Modern color palette and logo, featuring a plus-embellished monogram to represent new or modern."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light={isDark}>
          <ProjectSectionContent>
            <Image
              key={themeId}
              srcSet={`${
                isDark ? modernComponentsDark : modernComponentsLight
              } 800w, ${
                isDark ? modernComponentsDarkLarge : modernComponentsLightLarge
              } 1000w`}
              placeholder={
                isDark
                  ? modernComponentsDarkPlaceholder
                  : modernComponentsLightPlaceholder
              }
              alt={`A set of ${themeId} themed components for the Project Modern design system`}
              sizes="100vw"
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(themeId)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>Dark theme</SegmentedControlOption>
                <SegmentedControlOption>Light theme</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>Design and Development</ProjectSectionHeading>
              <ProjectSectionText>
                I lead the design and development of online services for Project Modern,
                ranging from website design and development to backing cloud and bot functions.
              </ProjectSectionText>
              <ProjectSectionText>
                I kept the brand and style of Project Modern consistent throughout its
                {` `}<Link href="https://storybook.projectmodern.gg" target="_blank">component-based design</Link>.
                This would inform both the aesthetics and user experience across the website
                and marketing material.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={themeId}
              srcSet={`${
                isDark ? modernDesignSystemDark : modernDesignSystemLight
              } 1280w, ${
                isDark ? modernDesignSystemDarkLarge : modernDesignSystemLightLarge
              } 2560w`}
              placeholder={
                isDark
                  ? modernDesignSystemDarkPlaceholder
                  : modernDesignSystemLightPlaceholder
              }
              alt="The homepage of the Project Modern design system docs website linking to amchor components."
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Design System</ProjectSectionHeading>
              <ProjectSectionText>
                A design system is useless if no one knows how to use it, so I put
                together a comprehensive documentation website to cover ux,
                accessibility, and component guidelines for designers and engineers
                working with the system.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>A Home for Project Modern</ProjectSectionHeading>
              <ProjectSectionText>
                A website is the biggest tell in brand. With a good, lasting impression,
                I designed and developed elegant interfaces, complimented with inviting
                interactions throughout the website.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${modernLanding} 1280w, ${modernLandingLarge} 2560w`}
              placeholder={modernLandingPlaceholder}
              alt="A screenshot of the landing page in production."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}

export default ProjectModern;
