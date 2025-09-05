/**
 * Terminal Loading Showcase
 * 
 * This example demonstrates various patterns and use cases for the terminal-style
 * loading animation feature in React Spectrum buttons.
 * 
 * Run this example to see terminal loading in action across different scenarios.
 */

import React, {useState, useCallback, useMemo} from 'react';
import {
  Button,
  ButtonGroup,
  TextField,
  Form,
  Picker,
  Item,
  Switch,
  Divider,
  Heading,
  Text,
  View,
  Flex
} from '@react-spectrum/s2';

// Utility function to simulate async operations
const simulateAsync = (duration: number) => 
  new Promise(resolve => setTimeout(resolve, duration));

export default function TerminalLoadingShowcase() {
  return (
    <View padding="size-400" maxWidth="800px">
      <Heading level={1} marginBottom="size-400">
        Terminal Loading Showcase
      </Heading>
      
      <Text marginBottom="size-600">
        This showcase demonstrates the terminal-style loading animation feature 
        across various use cases and configurations.
      </Text>

      <BasicExamples />
      <Divider size="M" marginY="size-600" />
      
      <CustomizationExamples />
      <Divider size="M" marginY="size-600" />
      
      <RealWorldExamples />
      <Divider size="M" marginY="size-600" />
      
      <InteractiveDemo />
      <Divider size="M" marginY="size-600" />
      
      <AccessibilityDemo />
    </View>
  );
}

// Basic terminal loading examples
function BasicExamples() {
  const [basicLoading, setBasicLoading] = useState(false);

  const handleBasicPress = useCallback(async () => {
    setBasicLoading(true);
    await simulateAsync(3000);
    setBasicLoading(false);
  }, []);

  return (
    <View>
      <Heading level={2} marginBottom="size-300">
        Basic Examples
      </Heading>
      
      <Text marginBottom="size-300">
        Simple terminal loading with default settings vs. custom text.
      </Text>

      <Flex gap="size-200" wrap>
        <Button 
          isPending={basicLoading}
          loadingStyle="terminal"
          onPress={handleBasicPress}
        >
          Default Terminal
        </Button>
        
        <Button 
          isPending={basicLoading}
          loadingStyle="terminal"
          terminalText="Processing"
          onPress={handleBasicPress}
        >
          Custom Text
        </Button>
        
        <Button 
          isPending={basicLoading}
          loadingStyle="spinner"
          onPress={handleBasicPress}
        >
          Spinner (Comparison)
        </Button>
      </Flex>
    </View>
  );
}

// Customization examples showing different configurations
function CustomizationExamples() {
  const [customLoading, setCustomLoading] = useState(false);

  const handleCustomPress = useCallback(async () => {
    setCustomLoading(true);
    await simulateAsync(5000);
    setCustomLoading(false);
  }, []);

  return (
    <View>
      <Heading level={2} marginBottom="size-300">
        Customization Options
      </Heading>
      
      <Text marginBottom="size-300">
        Different animation speeds, dot counts, and text configurations.
      </Text>

      <Flex direction="column" gap="size-200" alignItems="start">
        <Button 
          isPending={customLoading}
          loadingStyle="terminal"
          terminalText="Fast"
          terminalSpeed={200}
          terminalMaxDots={3}
          onPress={handleCustomPress}
        >
          Fast Animation (200ms, 3 dots)
        </Button>
        
        <Button 
          isPending={customLoading}
          loadingStyle="terminal"
          terminalText="Normal"
          terminalSpeed={500}
          terminalMaxDots={4}
          onPress={handleCustomPress}
        >
          Normal Speed (500ms, 4 dots)
        </Button>
        
        <Button 
          isPending={customLoading}
          loadingStyle="terminal"
          terminalText="Slow"
          terminalSpeed={800}
          terminalMaxDots={6}
          onPress={handleCustomPress}
        >
          Slow Animation (800ms, 6 dots)
        </Button>
        
        <Button 
          isPending={customLoading}
          loadingStyle="terminal"
          terminalText="Extended animation cycle"
          terminalSpeed={400}
          terminalMaxDots={8}
          onPress={handleCustomPress}
        >
          Long Text with Many Dots
        </Button>
      </Flex>
    </View>
  );
}

// Real-world use case examples
function RealWorldExamples() {
  const [fileLoading, setFileLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({name: '', email: ''});

  const handleFileOperation = useCallback(async (operation: string) => {
    setFileLoading(true);
    await simulateAsync(4000);
    setFileLoading(false);
    alert(`${operation} completed!`);
  }, []);

  const handleApiOperation = useCallback(async () => {
    setApiLoading(true);
    await simulateAsync(2500);
    setApiLoading(false);
    alert('Data synced successfully!');
  }, []);

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    await simulateAsync(3000);
    setFormLoading(false);
    alert('Form submitted successfully!');
    setFormData({name: '', email: ''});
  }, []);

  return (
    <View>
      <Heading level={2} marginBottom="size-300">
        Real-World Examples
      </Heading>
      
      <Text marginBottom="size-400">
        Common use cases with appropriate terminal loading configurations.
      </Text>

      {/* File Operations */}
      <View marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          File Operations
        </Heading>
        <Flex gap="size-200" wrap>
          <Button 
            isPending={fileLoading}
            loadingStyle="terminal"
            terminalText="Uploading"
            terminalSpeed={400}
            onPress={() => handleFileOperation('Upload')}
          >
            Upload Files
          </Button>
          
          <Button 
            isPending={fileLoading}
            loadingStyle="terminal"
            terminalText="Downloading"
            terminalSpeed={300}
            onPress={() => handleFileOperation('Download')}
          >
            Download Report
          </Button>
          
          <Button 
            isPending={fileLoading}
            loadingStyle="terminal"
            terminalText="Processing"
            terminalMaxDots={6}
            onPress={() => handleFileOperation('Process')}
          >
            Process Images
          </Button>
        </Flex>
      </View>

      {/* API Operations */}
      <View marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          API Operations
        </Heading>
        <Flex gap="size-200" wrap>
          <Button 
            isPending={apiLoading}
            loadingStyle="terminal"
            terminalText="Syncing"
            terminalSpeed={600}
            terminalMaxDots={5}
            variant="primary"
            onPress={handleApiOperation}
          >
            Sync Data
          </Button>
          
          <Button 
            isPending={apiLoading}
            loadingStyle="terminal"
            terminalText="Fetching"
            terminalSpeed={350}
            onPress={handleApiOperation}
          >
            Fetch Latest
          </Button>
        </Flex>
      </View>

      {/* Form Example */}
      <View>
        <Heading level={3} marginBottom="size-200">
          Form Submission
        </Heading>
        <Form onSubmit={handleFormSubmit} maxWidth="size-3600">
          <TextField 
            label="Name" 
            value={formData.name}
            onChange={(value) => setFormData(prev => ({...prev, name: value}))}
            isRequired
          />
          <TextField 
            label="Email" 
            type="email"
            value={formData.email}
            onChange={(value) => setFormData(prev => ({...prev, email: value}))}
            isRequired
          />
          <Button 
            type="submit"
            isPending={formLoading}
            loadingStyle="terminal"
            terminalText="Submitting"
            terminalSpeed={450}
            variant="primary"
          >
            Submit Form
          </Button>
        </Form>
      </View>
    </View>
  );
}

// Interactive demo allowing users to experiment
function InteractiveDemo() {
  const [demoLoading, setDemoLoading] = useState(false);
  const [config, setConfig] = useState({
    text: 'Demo',
    speed: 500,
    maxDots: 4,
    useTerminal: true
  });

  const handleDemoPress = useCallback(async () => {
    setDemoLoading(true);
    await simulateAsync(4000);
    setDemoLoading(false);
  }, []);

  const speedOptions = [
    {key: 200, label: 'Fast (200ms)'},
    {key: 350, label: 'Quick (350ms)'},
    {key: 500, label: 'Normal (500ms)'},
    {key: 750, label: 'Slow (750ms)'},
    {key: 1000, label: 'Very Slow (1000ms)'}
  ];

  const dotOptions = [
    {key: 2, label: '2 dots'},
    {key: 3, label: '3 dots'},
    {key: 4, label: '4 dots'},
    {key: 5, label: '5 dots'},
    {key: 6, label: '6 dots'},
    {key: 8, label: '8 dots'}
  ];

  return (
    <View>
      <Heading level={2} marginBottom="size-300">
        Interactive Demo
      </Heading>
      
      <Text marginBottom="size-400">
        Experiment with different terminal loading configurations in real-time.
      </Text>

      <Flex direction="column" gap="size-300" maxWidth="size-4600">
        <Switch 
          isSelected={config.useTerminal}
          onChange={(useTerminal) => setConfig(prev => ({...prev, useTerminal}))}
        >
          Use Terminal Loading
        </Switch>

        {config.useTerminal && (
          <>
            <TextField 
              label="Loading Text"
              value={config.text}
              onChange={(text) => setConfig(prev => ({...prev, text}))}
            />

            <Picker
              label="Animation Speed"
              selectedKey={config.speed}
              onSelectionChange={(speed) => setConfig(prev => ({...prev, speed: Number(speed)}))}
            >
              {speedOptions.map(option => (
                <Item key={option.key}>{option.label}</Item>
              ))}
            </Picker>

            <Picker
              label="Maximum Dots"
              selectedKey={config.maxDots}
              onSelectionChange={(maxDots) => setConfig(prev => ({...prev, maxDots: Number(maxDots)}))}
            >
              {dotOptions.map(option => (
                <Item key={option.key}>{option.label}</Item>
              ))}
            </Picker>
          </>
        )}

        <Button 
          isPending={demoLoading}
          loadingStyle={config.useTerminal ? 'terminal' : 'spinner'}
          terminalText={config.text}
          terminalSpeed={config.speed}
          terminalMaxDots={config.maxDots}
          onPress={handleDemoPress}
          variant="primary"
        >
          Test Configuration
        </Button>

        {config.useTerminal && (
          <Text>
            <strong>Preview:</strong> "{config.text}" → "{config.text}." → "{config.text}.." → 
            {Array.from({length: config.maxDots - 2}, (_, i) => ` "${config.text}${''.padEnd(i + 3, '.')}" →`)}
            {` "${config.text}${''.padEnd(config.maxDots, '.')}" → repeat`}
          </Text>
        )}
      </Flex>
    </View>
  );
}

// Accessibility demonstration
function AccessibilityDemo() {
  const [a11yLoading, setA11yLoading] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleA11yPress = useCallback(async () => {
    setA11yLoading(true);
    await simulateAsync(3500);
    setA11yLoading(false);
  }, []);

  // Simulate reduced motion preference
  const effectiveLoadingStyle = reducedMotion ? 'spinner' : 'terminal';

  return (
    <View>
      <Heading level={2} marginBottom="size-300">
        Accessibility Features
      </Heading>
      
      <Text marginBottom="size-400">
        Terminal loading includes comprehensive accessibility support.
      </Text>

      <Flex direction="column" gap="size-300" alignItems="start">
        <Switch 
          isSelected={reducedMotion}
          onChange={setReducedMotion}
        >
          Simulate "Reduce Motion" Preference
        </Switch>

        <Text>
          When users have motion sensitivity, the animation automatically 
          {reducedMotion ? ' switches to a static spinner' : ' respects their preferences'}.
        </Text>

        <Button 
          isPending={a11yLoading}
          loadingStyle={effectiveLoadingStyle}
          terminalText="Accessible loading"
          onPress={handleA11yPress}
          aria-label={a11yLoading ? "Processing request, please wait" : "Process request"}
        >
          Accessible Button
        </Button>

        <View backgroundColor="gray-100" padding="size-200" borderRadius="medium">
          <Text>
            <strong>Accessibility Features:</strong>
            <ul style={{margin: '8px 0', paddingLeft: '20px'}}>
              <li>Screen reader announcements for loading state changes</li>
              <li>Respects prefers-reduced-motion settings</li>
              <li>Maintains keyboard focus during loading</li>
              <li>Proper ARIA live regions for status updates</li>
              <li>High contrast mode compatibility</li>
            </ul>
          </Text>
        </View>
      </Flex>
    </View>
  );
}

// Context-aware terminal text helper
function useContextualTerminalText(operation: string) {
  return useMemo(() => {
    const textMap: Record<string, string> = {
      save: 'Saving',
      delete: 'Deleting',
      upload: 'Uploading',
      download: 'Downloading',
      process: 'Processing',
      analyze: 'Analyzing',
      export: 'Exporting',
      import: 'Importing',
      sync: 'Syncing',
      fetch: 'Fetching',
      submit: 'Submitting',
      connect: 'Connecting',
      validate: 'Validating'
    };
    
    return textMap[operation.toLowerCase()] || 'Loading';
  }, [operation]);
}

// Themed terminal loading component
interface ThemedTerminalButtonProps {
  children: React.ReactNode;
  operation: string;
  isPending: boolean;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  speed?: 'fast' | 'normal' | 'slow';
}

function ThemedTerminalButton({
  children,
  operation,
  isPending,
  onPress,
  variant = 'secondary',
  speed = 'normal'
}: ThemedTerminalButtonProps) {
  const terminalText = useContextualTerminalText(operation);
  
  const speedMap = {
    fast: 300,
    normal: 500,
    slow: 700
  };

  return (
    <Button
      isPending={isPending}
      loadingStyle="terminal"
      terminalText={terminalText}
      terminalSpeed={speedMap[speed]}
      variant={variant}
      onPress={onPress}
    >
      {children}
    </Button>
  );
}

// Export the themed component for use in other examples
export {ThemedTerminalButton, useContextualTerminalText};