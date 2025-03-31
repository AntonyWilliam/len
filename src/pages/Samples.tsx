import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import SampleCard from '../components/SampleCard';
import FilterPanel from '../components/FilterPanel';
import { samples } from '../data/samples';
import { FilterOptions, Sample } from '../types';
import DocumentPreviewModal from '../components/DocumentPreviewModal';

const SamplesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const FilterBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.default};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FilterControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ControlsGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 250px;
  height: 40px;
  margin-top: 8px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.lightText};
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}33`};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 180px;
  height: 40px;
  margin-top: 8px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const DropdownLabel = styled.span`
  position: absolute;
  left: 10px;
  top: -8px;
  background-color: white;
  padding: 0 4px;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  color: ${({ theme }) => theme.colors.lightText};
  z-index: 1;
  white-space: nowrap;
`;

const DropdownSelect = styled.select`
  width: 100%;
  height: 100%;
  padding: 0 30px 0 ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  background-color: white;
  cursor: pointer;
  appearance: none;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.lightText};
  pointer-events: none;
`;

// Removed ViewAndSortContainer

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: start;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SamplesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px dashed ${({ theme }) => theme.colors.lightText};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.lightText};
`;

const ResultCount = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-left: auto;
  margin-top: 8px;
  height: 40px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
    width: 100%;
    justify-content: flex-end;
  }
`;

const ViewButton = styled.button<{ active: boolean }>`
  background-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.white};
  color: ${({ active, theme }) => active ? theme.colors.white : theme.colors.text};
  border: 1px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.accent};
    border-color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.accent};
    color: ${({ active, theme }) => active ? theme.colors.white : theme.colors.text};
  }
`;

// Removed Sort components

const FilterTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const FilterTag = styled.div<{ type: 'industry' | 'type' | 'audience' | 'year' }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  background-color: ${({ theme, type }) => theme.colors[`${type}Light`]};
  color: ${({ theme, type }) => theme.colors[type]};
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  margin-left: 4px;
  cursor: pointer;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.7;
  }
`;

// List view card styles
const ListCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.default};
  transition: ${({ theme }) => theme.transitions.default};
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.hover};
    transform: translateY(-2px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ListCardHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.headerBg};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const ListCardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListCardActions = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const ListTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const ListYear = styled.span`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.small};
  opacity: 0.8;
`;

const ListDetails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.span<{ type: 'industry' | 'type' | 'audience' | 'year' }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
  background-color: ${({ theme, type }) => theme.colors[`${type}Light`]};
  color: ${({ theme, type }) => theme.colors[type]};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const TagIcon = styled.span`
  margin-right: 4px;
  font-size: 12px;
`;

const ListButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  transition: ${({ theme }) => theme.transitions.default};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const PreviewButton = styled(ListButton)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

const DownloadButton = styled(ListButton)`
  background-color: ${({ theme }) => theme.colors.headerBg};
`;

// List sample card component
const ListSampleCard: React.FC<{ sample: Sample }> = ({ sample }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function to get the proper path for a sample file
  const getLocalFilePath = (sampleUrl: string): string => {
    // Check if the URL is absolute (starts with http:// or https://)
    if (sampleUrl.startsWith('http://') || sampleUrl.startsWith('https://')) {
      // For HTTP URLs, ensure they're HTTPS for the Google PDF viewer
      if (sampleUrl.startsWith('http://')) {
        return sampleUrl.replace('http://', 'https://');
      }
      // Return the original URL for external links that are already HTTPS
      return sampleUrl;
    }
    
    // If the URL is relative, make it absolute relative to the public folder
    return `${window.location.origin}${sampleUrl}`;
  };
  
  // Function to get the filename from a URL
  const getFilenameFromUrl = (url: string): string => {
    // Extract the filename from the URL
    const pathParts = url.split('/');
    let filename = pathParts[pathParts.length - 1];
    
    // Clean up any query parameters
    if (filename.includes('?')) {
      filename = filename.split('?')[0];
    }
    
    return filename;
  };
  
  // Function to handle preview button click
  const handleViewSample = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent the default link behavior
    
    const processedLink = getLocalFilePath(sample.link);
    
    // Check if it's an external link
    const isExternalLink = sample.type === 'External Link' || 
                          (sample.link.startsWith('http://') || sample.link.startsWith('https://'));
    
    // Check file type
    const isPdf = processedLink.toLowerCase().endsWith('.pdf');
    const isHtml = processedLink.toLowerCase().includes('.htm');
    
    if (isExternalLink) {
      // For external links, open in a new tab
      window.open(processedLink, '_blank', 'noopener,noreferrer');
    } else if (isPdf || isHtml) {
      // Open the modal for PDF or HTML preview
      setIsModalOpen(true);
    } else {
      // For other file types, open in a new tab
      window.open(processedLink, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <ListCard>
        <ListCardHeader>
          <ListTitle>{sample.title}</ListTitle>
          <ListYear>({sample.year})</ListYear>
        </ListCardHeader>
        
        <ListCardBody>
          <ListDetails>
            <Tag type="industry">
              <TagIcon><i className="fas fa-building"></i></TagIcon>
              {sample.industry}
            </Tag>
            
            <Tag type="type">
              <TagIcon><i className="fas fa-file-alt"></i></TagIcon>
              {sample.type}
            </Tag>
            
            <Tag type="audience">
              <TagIcon><i className="fas fa-users"></i></TagIcon>
              {sample.audience}
            </Tag>
            
            <Tag type="year">
              <TagIcon><i className="fas fa-calendar-alt"></i></TagIcon>
              {sample.year}
            </Tag>
          </ListDetails>
          
          <p>{sample.notes}</p>
        </ListCardBody>
        
        <ListCardActions>
          <PreviewButton 
            href={sample.link} 
            onClick={handleViewSample}
          >
            <i className={`fas ${sample.type === 'External Link' ? 'fa-external-link-alt' : 'fa-eye'}`} style={{ marginRight: '8px' }}></i>
            {sample.type === 'External Link' ? 'Open Link' : 'Preview'}
          </PreviewButton>
          
          <DownloadButton 
            href={getLocalFilePath(sample.link)}
            download={sample.type !== 'External Link' ? getFilenameFromUrl(sample.link) : undefined}
            onClick={(e) => {
              if (sample.type === 'External Link') {
                e.preventDefault();
                window.open(sample.link, '_blank', 'noopener,noreferrer');
              }
            }}
          >
            <i className={`fas ${sample.type === 'External Link' ? 'fa-external-link-alt' : 'fa-download'}`} style={{ marginRight: '8px' }}></i>
            {sample.type === 'External Link' ? 'Visit Site' : 'Download'}
          </DownloadButton>
        </ListCardActions>
      </ListCard>
      
      <DocumentPreviewModal
        url={getLocalFilePath(sample.link)}
        title={sample.title}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

const Samples: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState({
    industry: null as string | null,
    type: null as string | null,
    audience: null as string | null,
    year: null as number | null,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy] = useState<'year-desc' | 'year-asc' | 'title'>('year-desc');
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Generate filter options from samples data
  const filterOptions: FilterOptions = useMemo(() => {
    const industries = Array.from(new Set(samples.map(sample => sample.industry))).sort();
    const types = Array.from(new Set(samples.map(sample => sample.type))).sort();
    const audiences = Array.from(new Set(samples.map(sample => sample.audience))).sort();
    const years = Array.from(new Set(samples.map(sample => sample.year))).sort((a, b) => b - a);
    
    return {
      industries,
      types,
      audiences,
      years,
    };
  }, []);

  // Filter samples based on active filters and search query
  const filteredSamples = useMemo(() => {
    // First apply filters and search
    const filtered = samples.filter(sample => {
      // Filter by category filters
      const industryMatch = !activeFilters.industry || sample.industry === activeFilters.industry;
      const typeMatch = !activeFilters.type || sample.type === activeFilters.type;
      const audienceMatch = !activeFilters.audience || sample.audience === activeFilters.audience;
      const yearMatch = !activeFilters.year || sample.year === activeFilters.year;
      
      // Filter by search query
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery || 
        sample.title.toLowerCase().includes(searchLower) ||
        sample.industry.toLowerCase().includes(searchLower) ||
        sample.type.toLowerCase().includes(searchLower) ||
        sample.audience.toLowerCase().includes(searchLower) ||
        sample.notes.toLowerCase().includes(searchLower);
      
      return industryMatch && typeMatch && audienceMatch && yearMatch && searchMatch;
    });
    
    // Then apply sorting
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [activeFilters, sortBy, searchQuery]);

  const handleFilterChange = (
    filterType: 'industry' | 'type' | 'audience' | 'year',
    value: string | number | null
  ) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Render active filter tags for the filter bar
  const renderFilterTags = () => {
    if (!activeFilters.industry && !activeFilters.type && !activeFilters.audience && !activeFilters.year) {
      return null;
    }

    return (
      <FilterTagsContainer>
        {activeFilters.industry && (
          <FilterTag type="industry">
            <TagIcon><i className="fas fa-building"></i></TagIcon>
            {activeFilters.industry}
            <RemoveTagButton onClick={() => handleFilterChange('industry', null)}>
              <i className="fas fa-times"></i>
            </RemoveTagButton>
          </FilterTag>
        )}
        
        {activeFilters.type && (
          <FilterTag type="type">
            <TagIcon><i className="fas fa-file-alt"></i></TagIcon>
            {activeFilters.type}
            <RemoveTagButton onClick={() => handleFilterChange('type', null)}>
              <i className="fas fa-times"></i>
            </RemoveTagButton>
          </FilterTag>
        )}
        
        {activeFilters.audience && (
          <FilterTag type="audience">
            <TagIcon><i className="fas fa-users"></i></TagIcon>
            {activeFilters.audience}
            <RemoveTagButton onClick={() => handleFilterChange('audience', null)}>
              <i className="fas fa-times"></i>
            </RemoveTagButton>
          </FilterTag>
        )}
        
        {activeFilters.year && (
          <FilterTag type="year">
            <TagIcon><i className="fas fa-calendar-alt"></i></TagIcon>
            {activeFilters.year}
            <RemoveTagButton onClick={() => handleFilterChange('year', null)}>
              <i className="fas fa-times"></i>
            </RemoveTagButton>
          </FilterTag>
        )}
      </FilterTagsContainer>
    );
  };

  return (
    <SamplesContainer>
      <Title>Technical Writing Samples</Title>
      
      {/* Combined filter bar */}
      <FilterBarContainer>
        <FilterControls>
          <ControlsGroup>
            <SearchBarContainer>
              <SearchIcon>
                <i className="fas fa-search"></i>
              </SearchIcon>
              <SearchInput 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBarContainer>
            
            <DropdownContainer style={{ width: '210px' }}>
              <DropdownLabel>Industry</DropdownLabel>
              <DropdownSelect
                value={activeFilters.industry || ''}
                onChange={(e) => handleFilterChange('industry', e.target.value || null)}
              >
                <option value="">All Industries</option>
                {filterOptions.industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </DropdownSelect>
              <DropdownIcon>
                <i className="fas fa-chevron-down"></i>
              </DropdownIcon>
            </DropdownContainer>
            
            <DropdownContainer style={{ width: '200px' }}>
              <DropdownLabel>Document Type</DropdownLabel>
              <DropdownSelect
                value={activeFilters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value || null)}
              >
                <option value="">All Types</option>
                {filterOptions.types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </DropdownSelect>
              <DropdownIcon>
                <i className="fas fa-chevron-down"></i>
              </DropdownIcon>
            </DropdownContainer>
            
            <DropdownContainer style={{ width: '180px' }}>
              <DropdownLabel>Audience</DropdownLabel>
              <DropdownSelect
                value={activeFilters.audience || ''}
                onChange={(e) => handleFilterChange('audience', e.target.value || null)}
              >
                <option value="">All Audiences</option>
                {filterOptions.audiences.map(audience => (
                  <option key={audience} value={audience}>{audience}</option>
                ))}
              </DropdownSelect>
              <DropdownIcon>
                <i className="fas fa-chevron-down"></i>
              </DropdownIcon>
            </DropdownContainer>
            
            <DropdownContainer style={{ width: '100px' }}>
              <DropdownLabel>Year</DropdownLabel>
              <DropdownSelect
                value={activeFilters.year || ''}
                onChange={(e) => handleFilterChange('year', e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">All Years</option>
                {filterOptions.years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </DropdownSelect>
              <DropdownIcon>
                <i className="fas fa-chevron-down"></i>
              </DropdownIcon>
            </DropdownContainer>
          </ControlsGroup>
          
          <ViewToggle>
            <ViewButton 
              active={viewMode === 'grid'} 
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <i className="fas fa-th-large"></i>
            </ViewButton>
            <ViewButton 
              active={viewMode === 'list'} 
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <i className="fas fa-list"></i>
            </ViewButton>
          </ViewToggle>
        </FilterControls>
        
        {renderFilterTags()}
      </FilterBarContainer>
      
      <ContentContainer>
        <div style={{ display: 'none' }}>
          {/* FilterPanel is hidden but kept for future use if needed */}
          <FilterPanel
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            isMobile={isMobile}
          />
        </div>
        
        <div style={{ gridColumn: '1 / -1' }}>
          <ResultCount>
            <span>Showing {filteredSamples.length} of {samples.length} samples</span>
          </ResultCount>
          
          {filteredSamples.length > 0 ? (
            viewMode === 'grid' ? (
              <SamplesGrid>
                {filteredSamples.map(sample => (
                  <SampleCard key={sample.id} sample={sample} />
                ))}
              </SamplesGrid>
            ) : (
              <SamplesList>
                {filteredSamples.map(sample => (
                  <ListSampleCard key={sample.id} sample={sample} />
                ))}
              </SamplesList>
            )
          ) : (
            <NoResults>
              <h3>No samples found</h3>
              <p>Try adjusting your filters or search query to see more results.</p>
            </NoResults>
          )}
        </div>
      </ContentContainer>
    </SamplesContainer>
  );
};

export default Samples;