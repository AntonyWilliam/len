import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filterOptions: FilterOptions;
  activeFilters: {
    industry: string | null;
    type: string | null;
    audience: string | null;
    year: number | null;
  };
  onFilterChange: (
    filterType: 'industry' | 'type' | 'audience' | 'year',
    value: string | number | null
  ) => void;
  isMobile?: boolean;
}

const Panel = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.default};
  position: sticky;
  top: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const MobilePanel = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.default};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FilterPanelHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PanelTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.headerBg};
`;

const PanelSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.lightText};
  margin: 0;
`;

const FilterSection = styled.div<{ isOpen?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h3<{ isClickable?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  
  &:hover {
    color: ${props => props.isClickable ? props.theme.colors.primary : 'inherit'};
  }
`;

const FiltersCategory = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CategoryLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.headerBg};
`;

const FilterItem = styled.button<{ active: boolean }>`
  background-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.white};
  color: ${({ active, theme }) => active ? theme.colors.white : theme.colors.text};
  border: 1px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  font-size: ${({ theme }) => theme.fontSizes.small};
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.accent};
    border-color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.accent};
    color: ${({ active, theme }) => active ? theme.colors.white : theme.colors.text};
  }
`;

const FilterIndicator = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
`;

const ActiveFiltersContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ActiveFiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

const ActiveFiltersTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.headerBg};
`;

const ActiveFilter = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const FilterCategory = styled.span`
  font-weight: bold;
  opacity: 0.8;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: 0;
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.small};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}33`};
  }
`;

const MobileFilterToggle = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CategoryList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-right: ${({ theme }) => theme.spacing.xs};
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

// Removed unused styled components

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterOptions,
  activeFilters,
  onFilterChange,
  isMobile = false
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [openSections, setOpenSections] = useState({
    industry: true,
    type: true,
    audience: true,
    year: true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(filterOptions);

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  // Filter options based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions(filterOptions);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    
    setFilteredOptions({
      industries: filterOptions.industries.filter(industry => 
        industry.toLowerCase().includes(searchTermLower)
      ),
      types: filterOptions.types.filter(type => 
        type.toLowerCase().includes(searchTermLower)
      ),
      audiences: filterOptions.audiences.filter(audience => 
        audience.toLowerCase().includes(searchTermLower)
      ),
      years: filterOptions.years
    });
  }, [searchTerm, filterOptions]);

  const toggleSection = (section: 'industry' | 'type' | 'audience' | 'year') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearFilters = () => {
    onFilterChange('industry', null);
    onFilterChange('type', null);
    onFilterChange('audience', null);
    onFilterChange('year', null);
    setSearchTerm('');
  };

  // Render active filters chips
  const renderActiveFilters = () => {
    if (!activeFilterCount) return null;

    return (
      <ActiveFiltersContainer>
        <ActiveFiltersHeader>
          <ActiveFiltersTitle>Active Filters</ActiveFiltersTitle>
          <ClearButton onClick={clearFilters}>Clear all</ClearButton>
        </ActiveFiltersHeader>
        
        {activeFilters.industry && (
          <ActiveFilter>
            <FilterCategory>Industry:</FilterCategory> {activeFilters.industry}
            <RemoveButton onClick={() => onFilterChange('industry', null)}>×</RemoveButton>
          </ActiveFilter>
        )}
        {activeFilters.type && (
          <ActiveFilter>
            <FilterCategory>Type:</FilterCategory> {activeFilters.type}
            <RemoveButton onClick={() => onFilterChange('type', null)}>×</RemoveButton>
          </ActiveFilter>
        )}
        {activeFilters.audience && (
          <ActiveFilter>
            <FilterCategory>Audience:</FilterCategory> {activeFilters.audience}
            <RemoveButton onClick={() => onFilterChange('audience', null)}>×</RemoveButton>
          </ActiveFilter>
        )}
        {activeFilters.year && (
          <ActiveFilter>
            <FilterCategory>Year:</FilterCategory> {activeFilters.year}
            <RemoveButton onClick={() => onFilterChange('year', null)}>×</RemoveButton>
          </ActiveFilter>
        )}
      </ActiveFiltersContainer>
    );
  };

  // Mobile filter UI
  if (isMobile) {
    return (
      <>
        <MobileFilterToggle onClick={() => setShowMobileFilters(!showMobileFilters)}>
          <span>
            <i className="fas fa-filter" style={{ marginRight: '8px' }}></i>
            {activeFilterCount > 0 ? `Filters (${activeFilterCount})` : 'Filters'}
          </span>
          <span>{showMobileFilters ? '▲' : '▼'}</span>
        </MobileFilterToggle>

        {showMobileFilters && (
          <MobilePanel>
            <FilterPanelHeader>
              <PanelTitle>Sample Filters</PanelTitle>
              <PanelSubtitle>Find the perfect document sample</PanelSubtitle>
            </FilterPanelHeader>
            
            <SearchInput 
              type="text" 
              placeholder="Search filters..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {renderActiveFilters()}

            <FilterSection>
              <FilterTitle isClickable onClick={() => toggleSection('industry')}>
                Industry
                <span>{openSections.industry ? '▲' : '▼'}</span>
              </FilterTitle>
              {openSections.industry && (
                <CategoryList>
                  {filteredOptions.industries.map((industry) => (
                    <FilterItem
                      key={industry}
                      active={activeFilters.industry === industry}
                      onClick={() => onFilterChange('industry', activeFilters.industry === industry ? null : industry)}
                    >
                      {activeFilters.industry === industry && <FilterIndicator />}
                      {industry}
                    </FilterItem>
                  ))}
                </CategoryList>
              )}
            </FilterSection>
            
            <FilterSection>
              <FilterTitle isClickable onClick={() => toggleSection('type')}>
                Document Type
                <span>{openSections.type ? '▲' : '▼'}</span>
              </FilterTitle>
              {openSections.type && (
                <CategoryList>
                  {filteredOptions.types.map((type) => (
                    <FilterItem
                      key={type}
                      active={activeFilters.type === type}
                      onClick={() => onFilterChange('type', activeFilters.type === type ? null : type)}
                    >
                      {activeFilters.type === type && <FilterIndicator />}
                      {type}
                    </FilterItem>
                  ))}
                </CategoryList>
              )}
            </FilterSection>
            
            <FilterSection>
              <FilterTitle isClickable onClick={() => toggleSection('audience')}>
                Audience
                <span>{openSections.audience ? '▲' : '▼'}</span>
              </FilterTitle>
              {openSections.audience && (
                <CategoryList>
                  {filteredOptions.audiences.map((audience) => (
                    <FilterItem
                      key={audience}
                      active={activeFilters.audience === audience}
                      onClick={() => onFilterChange('audience', activeFilters.audience === audience ? null : audience)}
                    >
                      {activeFilters.audience === audience && <FilterIndicator />}
                      {audience}
                    </FilterItem>
                  ))}
                </CategoryList>
              )}
            </FilterSection>
            
            <FilterSection>
              <FilterTitle isClickable onClick={() => toggleSection('year')}>
                Year
                <span>{openSections.year ? '▲' : '▼'}</span>
              </FilterTitle>
              {openSections.year && (
                <CategoryList>
                  {filteredOptions.years.map((year) => (
                    <FilterItem
                      key={year}
                      active={activeFilters.year === year}
                      onClick={() => onFilterChange('year', activeFilters.year === year ? null : year)}
                    >
                      {activeFilters.year === year && <FilterIndicator />}
                      {year}
                    </FilterItem>
                  ))}
                </CategoryList>
              )}
            </FilterSection>
          </MobilePanel>
        )}

        {/* Always show active filters even when filter panel is collapsed */}
        {!showMobileFilters && activeFilterCount > 0 && (
          <ActiveFiltersContainer>
            {renderActiveFilters()}
          </ActiveFiltersContainer>
        )}
      </>
    );
  }

  // Desktop filter UI
  return (
    <Panel>
      <FilterPanelHeader>
        <PanelTitle>Sample Filters</PanelTitle>
        <PanelSubtitle>Find the perfect document sample</PanelSubtitle>
      </FilterPanelHeader>
      
      <SearchInput 
        type="text" 
        placeholder="Search filters..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {renderActiveFilters()}

      <FiltersCategory>
        <CategoryLabel>Industry</CategoryLabel>
        <CategoryList>
          {filteredOptions.industries.map((industry) => (
            <FilterItem
              key={industry}
              active={activeFilters.industry === industry}
              onClick={() => onFilterChange('industry', activeFilters.industry === industry ? null : industry)}
            >
              {activeFilters.industry === industry && <FilterIndicator />}
              {industry}
            </FilterItem>
          ))}
        </CategoryList>
      </FiltersCategory>
      
      <FiltersCategory>
        <CategoryLabel>Document Type</CategoryLabel>
        <CategoryList>
          {filteredOptions.types.map((type) => (
            <FilterItem
              key={type}
              active={activeFilters.type === type}
              onClick={() => onFilterChange('type', activeFilters.type === type ? null : type)}
            >
              {activeFilters.type === type && <FilterIndicator />}
              {type}
            </FilterItem>
          ))}
        </CategoryList>
      </FiltersCategory>
      
      <FiltersCategory>
        <CategoryLabel>Audience</CategoryLabel>
        <CategoryList>
          {filteredOptions.audiences.map((audience) => (
            <FilterItem
              key={audience}
              active={activeFilters.audience === audience}
              onClick={() => onFilterChange('audience', activeFilters.audience === audience ? null : audience)}
            >
              {activeFilters.audience === audience && <FilterIndicator />}
              {audience}
            </FilterItem>
          ))}
        </CategoryList>
      </FiltersCategory>
      
      <FiltersCategory>
        <CategoryLabel>Year</CategoryLabel>
        <CategoryList>
          {filteredOptions.years.map((year) => (
            <FilterItem
              key={year}
              active={activeFilters.year === year}
              onClick={() => onFilterChange('year', activeFilters.year === year ? null : year)}
            >
              {activeFilters.year === year && <FilterIndicator />}
              {year}
            </FilterItem>
          ))}
        </CategoryList>
      </FiltersCategory>
    </Panel>
  );
};

export default FilterPanel;